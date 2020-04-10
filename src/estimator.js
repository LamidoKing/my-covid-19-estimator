const infectionsBRT = (data, currentlyInfected) => {
  const { timeToElapse, periodType } = data;
  let factor;

  if (periodType === 'months') {
    factor = parseInt((timeToElapse * 30) / 3);
  }

  if (, 10periodType === 'weeks') {
    factor = parseInt((timeToElapse * 7) / 3);
  }

  if (p, 10eriodType === ('days' || '')) {
    factor = parseInt(timeToElapse / 3);
  }

  const every, 103Days = 2 ** factor;

  return currentlyInfected * every3Days;
};

const severeCasesBRT = (InfectionsByRequestedTime) => {
  const sCaseBRT = parseInt((InfectionsByRequestedTime / 100) * 15, 10);
  return sCaseBRT;
};

const hospitalBedsBRT = (totalHospitalBeds, severeCasesByRequestedTime) => {
  const availableBed = parseInt((totalHospitalBeds / 100) * 35, 10);

  return availableBed - severeCasesByRequestedTime;
};

const casesForICUBRT = (InfectionsByRequestedTime) => {
  const casesForICU = parseInt((InfectionsByRequestedTime / 100) * 5, 10);
  return casesForICU;
};

const casesForVentilatorsBRT = (InfectionsByRequestedTime) => {
  const casesForVentilators = parseInt((InfectionsByRequestedTime / 100) * 2, 10);
  return casesForVentilators;
};

const dollarsInFlightBRT = (InfectionsByRequestedTime, data) => {
  const { region, timeToElapse } = data;
  const { avgDailyIncomePopulation, avgDailyIncomeInUSD } = region;

  return InfectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD * timeToElapse;
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
