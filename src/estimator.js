const periodTodays = (timeToElapse, periodType) => {
  if (periodType === 'months') {
    return parseInt((timeToElapse * 30) / 3, 10);
  }

  if (periodType === 'weeks') {
    return parseInt((timeToElapse * 7) / 3, 10);
  }

  return parseInt(timeToElapse / 3, 10);
};

const infectionsBRT = (data, currentlyInfected) => {
  const { timeToElapse, periodType } = data;
  const factor = periodTodays(timeToElapse, periodType);

  const every3Days = 2 ** factor;

  return currentlyInfected * every3Days;
};

const severeCasesBRT = (InfectionsByRequestedTime) => {
  const sCaseBRT = (InfectionsByRequestedTime / 100) * 15;
  return parseInt(sCaseBRT, 10);
};

const hospitalBedsBRT = (totalHospitalBeds, severeCasesByRequestedTime) => {
  const availableBed = (totalHospitalBeds / 100) * 35;

  return parseInt(availableBed - severeCasesByRequestedTime, 10);
};

const casesForICUBRT = (InfectionsByRequestedTime) => {
  const casesForICU = (InfectionsByRequestedTime / 100) * 5;
  return casesForICU;
};

const casesForVentilatorsBRT = (InfectionsByRequestedTime) => {
  const casesForVentilators = (InfectionsByRequestedTime / 100) * 2;
  return casesForVentilators;
};

const dollarsInFlightBRT = (InfectionsByRequestedTime, data) => {
  const { region, timeToElapse, periodType } = data;
  const { avgDailyIncomePopulation, avgDailyIncomeInUSD } = region;

  const avgDPop = avgDailyIncomePopulation / 100;

  const time = periodTodays(timeToElapse, periodType);

  return parseInt(InfectionsByRequestedTime * avgDPop * avgDailyIncomeInUSD * time, 10);
};

const covid19ImpactEstimator = (data) => {
  const currentlyInfectedI = data.reportedCases * 10;

  const currentlyInfectedSI = data.reportedCases * 50;

  const infectionsByRequestedTimeI = infectionsBRT(data, currentlyInfectedI);

  const infectionsByRequestedTimeSI = infectionsBRT(data, currentlyInfectedSI);

  const severeCasesByRequestedTimeI = severeCasesBRT(infectionsByRequestedTimeI);

  const severeCasesByRequestedTimeSI = severeCasesBRT(infectionsByRequestedTimeSI);

  const hospitalBedsByRTI = hospitalBedsBRT(data.totalHospitalBeds, severeCasesByRequestedTimeI);

  const hospitalBedsByRTSI = hospitalBedsBRT(data.totalHospitalBeds, severeCasesByRequestedTimeSI);

  const casesForICUByRTI = casesForICUBRT(infectionsByRequestedTimeI);

  const casesForICUByRTSI = casesForICUBRT(infectionsByRequestedTimeSI);

  const casesForVentilatorsByRTI = casesForVentilatorsBRT(infectionsByRequestedTimeI);

  const casesForVentilatorsByRTSI = casesForVentilatorsBRT(infectionsByRequestedTimeSI);

  const dollarsInFlightByRTI = dollarsInFlightBRT(infectionsByRequestedTimeI, data);

  const dollarsInFlightByRTSI = dollarsInFlightBRT(infectionsByRequestedTimeSI, data);

  const impact = {
    currentlyInfected: currentlyInfectedI,
    infectionsByRequestedTime: infectionsByRequestedTimeI,
    severeCasesByRequestedTime: severeCasesByRequestedTimeI,
    hospitalBedsByRequestedTime: hospitalBedsByRTI,
    casesForICUByRequestedTime: casesForICUByRTI,
    casesForVentilatorsByRequestedTime: casesForVentilatorsByRTI,
    dollarsInFlight: dollarsInFlightByRTI
  };

  const severeImpact = {
    currentlyInfected: currentlyInfectedSI,
    infectionsByRequestedTime: infectionsByRequestedTimeSI,
    severeCasesByRequestedTime: severeCasesByRequestedTimeSI,
    hospitalBedsByRequestedTime: hospitalBedsByRTSI,
    casesForICUByRequestedTime: casesForICUByRTSI,
    casesForVentilatorsByRequestedTime: casesForVentilatorsByRTSI,
    dollarsInFlight: dollarsInFlightByRTSI
  };


  return {
    data,
    impact,
    severeImpact
  };
};


export default covid19ImpactEstimator;
