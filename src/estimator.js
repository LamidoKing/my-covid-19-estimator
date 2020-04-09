const infectionsBRT = (data, currentlyInfected) => {
  const { timeToElapse, periodType } = data;
  let factor = timeToElapse / 3;

  if (periodType === 'months') {
    factor = (timeToElapse * 30) / 3;
  }

  if (periodType === 'weeks') {
    factor = (timeToElapse * 7) / 3;
  }

  const every3Days = 2 ** factor;

  return currentlyInfected * every3Days;
};

const severeCasesBRT = (InfectionsByRequestedTime) => (InfectionsByRequestedTime / 100) * 15;

const hospitalBedsBRT = (totalHospitalBeds, severeCasesByRequestedTime) => {
  const availableBed = (totalHospitalBeds / 100) * 35;

  return availableBed - severeCasesByRequestedTime;
};

const casesForICUBRT = (InfectionsByRequestedTime) => (InfectionsByRequestedTime / 100) * 5;

const casesForVentilatorsBRT = (InfectionsByRequestedTime) => (InfectionsByRequestedTime / 100) * 2;

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
