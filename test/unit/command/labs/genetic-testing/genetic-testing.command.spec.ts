import { 
  processDnaSample,
  receiveDnaSample,
  rejectDnaSample,
  submitIndependentTestResult,
  submitTestResult
} from "../../../../../src/command/labs/genetic-testing";
import { ApiPromise, signAndSendWithPaymentInfo, eventAndStatusMock } from "../../../@polkadot-api.mock";
import { mockFunction } from "../../../mock";
import { geneticTesting } from "./genetic-testing.command.mock";

jest.mock('../../../mock', () => ({
  mockFunction: jest.fn(),
}));

describe('geneticTesting Commands Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.tx = { geneticTesting: geneticTesting };
  
  const signAndSendSpy = jest.spyOn(signAndSendWithPaymentInfo, 'signAndSend');
  const paymentInfoSpy = jest.spyOn(signAndSendWithPaymentInfo, 'paymentInfo');
  const processDnaSampeSpy = jest.spyOn(geneticTesting, 'processDnaSample');
  const receivedDnaSampleSpy = jest.spyOn(geneticTesting, 'receiveDnaSample');
  const rejectedDnaSampleSpy = jest.spyOn(geneticTesting, 'rejectDnaSample');
  const submitIndependentTestResultSpy = jest.spyOn(geneticTesting, 'submitIndependentTestResult');
  const submitTestResultSpy = jest.spyOn(geneticTesting, 'submitTestResult');
  
  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    signAndSendSpy.mockClear();
    paymentInfoSpy.mockClear();
    processDnaSampeSpy.mockClear();
    receivedDnaSampleSpy.mockClear();
    rejectedDnaSampleSpy.mockClear();
    submitIndependentTestResultSpy.mockClear();
    submitTestResultSpy.mockClear();
  });

  it('process dna sample should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const TRACKING_ID = "TRACKING_ID";
      const PROCESS_STATUS = "PROCESS_STATUS";

      // Act
      await processDnaSample(
        API_PROMISE_MOCK as any, 
        PAIR,
        TRACKING_ID,
        PROCESS_STATUS,
        mockFunction
      );
        
      // Assert
      expect(processDnaSampeSpy).toBeCalledTimes(1);
      expect(processDnaSampeSpy).toBeCalledWith(TRACKING_ID, PROCESS_STATUS);
      expect(signAndSendSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
      expect(mockFunction).toBeCalledTimes(1);
  });

  it('receive dna sample should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const TRACKING_ID = "TRACKING_ID";

      // Act
      await receiveDnaSample(
        API_PROMISE_MOCK as any, 
        PAIR,
        TRACKING_ID,
        mockFunction
      );
        
      // Assert
      expect(receivedDnaSampleSpy).toBeCalledTimes(1);
      expect(receivedDnaSampleSpy).toBeCalledWith(TRACKING_ID);
      expect(signAndSendSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
      expect(mockFunction).toBeCalledTimes(1);
  });

  it('rejected dna sample should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const TRACKING_ID = "TRACKING_ID";
      const REJECTED_TITLE = "STRING";
      const REJECTED_DESCRIPTION = "STRING";

      // Act
      await rejectDnaSample(
        API_PROMISE_MOCK as any, 
        PAIR,
        TRACKING_ID,
        REJECTED_TITLE,
        REJECTED_DESCRIPTION,
        mockFunction
      );
        
      // Assert
      expect(rejectedDnaSampleSpy).toBeCalledTimes(1);
      expect(rejectedDnaSampleSpy).toBeCalledWith(TRACKING_ID, REJECTED_TITLE, REJECTED_DESCRIPTION);
      expect(signAndSendSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
      expect(mockFunction).toBeCalledTimes(1);
  });

  it('submit independent test result should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const DNA_TEST_RESULT_SUBMISSION = {
        comments: 'string',
        resultLink: 'string',
        reportLink: 'string',
      };

      // Act
      await submitIndependentTestResult(
        API_PROMISE_MOCK as any, 
        PAIR,
        DNA_TEST_RESULT_SUBMISSION,
        mockFunction
      );
        
      // Assert
      expect(submitIndependentTestResultSpy).toBeCalledTimes(1);
      expect(submitIndependentTestResultSpy).toBeCalledWith(DNA_TEST_RESULT_SUBMISSION);
      expect(signAndSendSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
      expect(mockFunction).toBeCalledTimes(1);
  });

  it('submit test result should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const TRACKING_ID = "TRACKING_ID";
      const SUBMISSION = {
        comments: 'string',
        resultLink: 'string',
        reportLink: 'string',
      };

      // Act
      await submitTestResult(
        API_PROMISE_MOCK as any, 
        PAIR,
        TRACKING_ID,
        SUBMISSION,
        mockFunction
      );
        
      // Assert
      expect(submitTestResultSpy).toBeCalledTimes(1);
      expect(submitTestResultSpy).toBeCalledWith(TRACKING_ID, SUBMISSION);
      expect(signAndSendSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
      expect(mockFunction).toBeCalledTimes(1);
  });
});
