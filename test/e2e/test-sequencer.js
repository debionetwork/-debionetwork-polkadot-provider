const Sequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends Sequencer {
  sort(tests) {    
    const testsArray = Array.from(tests);
    
    const sequence = [];
    sequence.push(...testsArray.filter(obj => {
      return obj.path.includes('user-profile.spec.ts');
    }));
    sequence.push(...testsArray.filter(obj => {
      return obj.path.includes('doctors/index.spec.ts');
    }));
    sequence.push(...testsArray.filter(obj => {
      return obj.path.includes('doctors/certifications.spec.ts');
    }));
    sequence.push(...testsArray.filter(obj => {
      return obj.path.includes('hospitals/index.spec.ts');
    }));
    sequence.push(...testsArray.filter(obj => {
      return obj.path.includes('hospitals/certifications.spec.ts');
    }));
    sequence.push(...testsArray.filter(obj => {
      return obj.path.includes('labs/index.spec.ts');
    }));
    sequence.push(...testsArray.filter(obj => {
      return obj.path.includes('labs/certifications.spec.ts');
    }));
    sequence.push(...testsArray.filter(obj => {
      return obj.path.includes('labs/orders.spec.ts');
    }));
    sequence.push(...testsArray.filter(obj => {
      return obj.path.includes('labs/genetic-testing.spec.ts');
    }));
    sequence.push(...testsArray.filter(obj => {
      return obj.path.includes('service-request.spec.ts');
    }));
    sequence.push(...testsArray.filter(obj => {
      return obj.path.includes('labs/services.spec.ts');
    }));
    sequence.push(...testsArray.filter(obj => {
      return obj.path.includes('electronic-medical-record.spec.ts');
    }));
    sequence.push(...testsArray.filter(obj => {
      return obj.path.includes('genetic-analysts/index.spec.ts');
    }));
    sequence.push(...testsArray.filter(obj => {
      return obj.path.includes('genetic-analysts/genetic-analyst-qualifications.spec.ts');
    }));
    sequence.push(...testsArray.filter(obj => {
      return obj.path.includes('genetic-analysts/genetic-analyst-service.spec.ts');
    }));
    sequence.push(...testsArray.filter(obj => {
      return obj.path.includes('genetic-analysts/genetic-data.spec.ts');
    }));
    sequence.push(...testsArray.filter(obj => {
      return obj.path.includes('genetic-analysts/genetic-analysis-order.spec.ts');
    }));
    sequence.push(...testsArray.filter(obj => {
      return obj.path.includes('genetic-analysts/genetic-analysis.spec.ts');
    }));
    sequence.push(...testsArray.filter(obj => {
      return obj.path.includes('rewards.spec.ts');
    }));

    return sequence;
  }
}

module.exports = CustomSequencer;