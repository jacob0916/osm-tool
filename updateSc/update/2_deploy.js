const TokenManagerProxy = artifacts.require('TokenManagerProxy');
const TokenManagerDelegate = artifacts.require('TokenManagerDelegate');
const Secp256k1 = artifacts.require('Secp256k1');
const SchnorrVerifier = artifacts.require('SchnorrVerifier');
const QuotaLib = artifacts.require('QuotaLib');
const PosLib = artifacts.require('PosLib');
const StoremanUtil = artifacts.require('StoremanUtil');

const HTLCLib = artifacts.require('HTLCLib');
const HTLCDebtLib = artifacts.require('HTLCDebtLib');
const HTLCSmgLib = artifacts.require('HTLCSmgLib');
const HTLCUserLib = artifacts.require('HTLCUserLib');
const HTLCProxy = artifacts.require('HTLCProxy');
const HTLCDelegate = artifacts.require('HTLCDelegate');
const StoremanGroupProxy = artifacts.require('StoremanGroupProxy');
const StoremanGroupDelegate = artifacts.require('StoremanGroupDelegate');
const TestSmg = artifacts.require('TestSmg');

const EnhancementLib = artifacts.require('EnhancementLib');
const CommonTool = artifacts.require('CommonTool');
const MetricProxy = artifacts.require('MetricProxy');
const MetricDelegate = artifacts.require('MetricDelegate');
const MetricLib = artifacts.require('MetricLib');
const FakeSmg = artifacts.require('FakeSmg');

const Secp256k1Curve = artifacts.require('Secp256k1Curve');
const Bn256Curve = artifacts.require('Bn256Curve');
const Encrypt = artifacts.require('Encrypt');
const DataConvert = artifacts.require('DataConvert');
const GpkLib = artifacts.require('GpkLib');
const CreateGpkProxy = artifacts.require('CreateGpkProxy');
const CreateGpkDelegate = artifacts.require('CreateGpkDelegate');
const Deposit = artifacts.require('Deposit');
const StoremanLib = artifacts.require('StoremanLib');
const IncentiveLib = artifacts.require('IncentiveLib');

const fakeQuota = artifacts.require('fakeQuota');

const curveMap = new Map([
    ['secp256k1', 0],
    ['bn256', 1]
])

module.exports = async function (deployer) {


    // CreateGpkProxy: 0xc7dA0335A962A0Cb55aCF12eE41581FebF0AF089
    // HTLCProxy: 0x2E27c3575e79c24Eeabc7595BD01D5f3477184ED
    // MetricProxy: 0x63dC3737C3876d2fcec063FE1C7846D3d29850d0
    // StoremanGroupProxy: 0xC8FFFa4463569D06b7f7038Ae7b74CFeB094Bff0
    // TokenManagerProxy: 0xd72A415eA27570398d54Ee4cF45fC979cC79ca60


    let metricProxyAddr = '0x63dC3737C3876d2fcec063FE1C7846D3d29850d0';
    let smgProxyAddr = '0xC8FFFa4463569D06b7f7038Ae7b74CFeB094Bff0';
    let gpkProxyAdd = '0xc7dA0335A962A0Cb55aCF12eE41581FebF0AF089';

    let metricProxy = await MetricProxy.at(metricProxyAddr);
    let smgProxy = await StoremanGroupProxy.at(smgProxyAddr);
    let gpkProxy = await CreateGpkProxy.at(gpkProxyAdd);

    // smg
    await deployer.deploy(PosLib);
    await deployer.link(PosLib,StoremanUtil);
    await deployer.deploy(StoremanUtil);
    await deployer.link(StoremanUtil,StoremanLib);
    await deployer.link(StoremanUtil,IncentiveLib);
    await deployer.link(PosLib,StoremanGroupDelegate);
    await deployer.deploy(Deposit);
    await deployer.link(Deposit,StoremanGroupDelegate);
    await deployer.deploy(StoremanLib);
    await deployer.link(StoremanLib,StoremanGroupDelegate);
    await deployer.link(PosLib,IncentiveLib)
    await deployer.deploy(IncentiveLib);
    await deployer.link(IncentiveLib,StoremanGroupDelegate);
    await deployer.link(StoremanUtil,StoremanGroupDelegate);

    await deployer.deploy(StoremanGroupDelegate);
    let smgDelegate = await StoremanGroupDelegate.deployed();
    await smgProxy.upgradeTo(smgDelegate.address);
    console.log("smg address:", smgProxy.address);

    await deployer.deploy(TestSmg);
    let tsmg = await TestSmg.deployed();
    await tsmg.setSmgAddr(smgProxy.address);


    //metric
    await deployer.deploy(EnhancementLib);
    await deployer.deploy(PosLib);
    await deployer.deploy(FakeSmg);
    await deployer.link(EnhancementLib, CommonTool);
    await deployer.deploy(CommonTool);
    await deployer.link(CommonTool, MetricLib);
    await deployer.link(PosLib, MetricLib);
    await deployer.deploy(MetricLib);

    await deployer.link(CommonTool, MetricDelegate);
    await deployer.link(MetricLib, MetricDelegate);
    await deployer.link(PosLib, MetricDelegate);

    await deployer.deploy(MetricDelegate);
    let metricDlg = await MetricDelegate.deployed();
    await metricProxy.upgradeTo(metricDlg.address);
    console.log("metric address:", metricProxy.address);

    let metric = await MetricDelegate.at(metricProxy.address);
    await metric.setDependence(smgProxy.address, smgProxy.address);


    // create gpk sc
    await deployer.deploy(Encrypt);
    await deployer.deploy(DataConvert);

    await deployer.link(Encrypt, GpkLib);
    await deployer.link(DataConvert, GpkLib);
    await deployer.deploy(GpkLib);

    await deployer.link(GpkLib, CreateGpkDelegate);
    await deployer.deploy(CreateGpkDelegate);

    let gpkDelegate = await CreateGpkDelegate.deployed();
    await gpkProxy.upgradeTo(gpkDelegate.address);
    console.log("gpk address:", gpkProxy.address);

    //let gpk = await CreateGpkDelegate.at(CreateGpkProxy.address);
    let gpk = await CreateGpkDelegate.at(gpkProxy.address);
    await gpk.setDependence(smgProxy.address);

    await deployer.deploy(Secp256k1Curve);
    let secp256k1 = await Secp256k1Curve.deployed();
    await gpk.setCurve(curveMap.get('secp256k1'), secp256k1.address);
    await deployer.deploy(Bn256Curve);
    let bn256 = await Bn256Curve.deployed();
    await gpk.setCurve(curveMap.get('bn256'), bn256.address);

	await deployer.deploy(fakeQuota);
    	let fakeQuotaInst = await fakeQuota.deployed();

    //let smg = await StoremanGroupDelegate.at(smgProxy.address)
    //let ret = await smg.setDependence(metricProxy.address, gpkProxy.address, fakeQuotaInst.address,{from:"0x2d0e7c0813a51d3bd1d08246af2a8a7a57d8922e"});
    let ret = await smgDelegate.setDependence(metricProxy.address, gpkProxy.address, fakeQuotaInst.address,{from:"0x2d0e7c0813a51d3bd1d08246af2a8a7a57d8922e"});
    console.log("ret of smg.setDependence");

}

