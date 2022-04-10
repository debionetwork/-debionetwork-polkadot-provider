import { createRequest, retrieveUnstakedAmount, createRequestFee, unstakeRequestFee, generateRequestId, unstakeRequest, claimRequest, processRequest, finalizeRequest } from "../../../../src/command/service-request";
import { successCallback } from "../../../../src/index";
import { ApiPromise, eventAndStatusMock, signAndSendWithPaymentInfo } from "../../@polkadot-api.mock";
import { mockFunction } from "../../mock";
import { serviceRequest } from "./service-request.command.mock";

jest.mock('../../mock', () => ({
  mockFunction: jest.fn(),
}));

jest.mock('../../../../src/index', () => ({
  successCallback: jest.fn(() => mockFunction()),
}));

describe('Service Request Commands Unit Testing', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.tx = {
    serviceRequest: serviceRequest
  };

  const signAndSendSpy = jest.spyOn(signAndSendWithPaymentInfo, 'signAndSend');
  const paymentInfoSpy = jest.spyOn(signAndSendWithPaymentInfo, 'paymentInfo');
  const createRequestSpy = jest.spyOn(serviceRequest, 'createRequest');
  const unstakeSpy = jest.spyOn(serviceRequest, 'unstake');
  const retrieveUnstakedAmountSpy = jest.spyOn(serviceRequest, 'retrieveUnstakedAmount');
  const generateRequestidSpy = jest.spyOn(serviceRequest, 'generateRequestid');
  const claimRequestSpy = jest.spyOn(serviceRequest, 'claimRequest');
  const processRequestSpy = jest.spyOn(serviceRequest, 'processRequest');
  const finalizeRequestSpy = jest.spyOn(serviceRequest, 'finalizeRequest');

  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    (successCallback as jest.Mock).mockClear();
    signAndSendSpy.mockClear();
    paymentInfoSpy.mockClear();
    createRequestSpy.mockClear();
    unstakeSpy.mockClear();
    retrieveUnstakedAmountSpy.mockClear();
    generateRequestidSpy.mockClear();
    claimRequestSpy.mockClear();
    processRequestSpy.mockClear();
    finalizeRequestSpy.mockClear();
  });
  
  it('retrieveUnstakedAmount should return', async () => {
      // Arrange
      const PAIR = "PAIR";
      const REQUEST_ID = "REQUEST_ID";

      // Act
      await retrieveUnstakedAmount(
        API_PROMISE_MOCK as any, 
        PAIR,
        REQUEST_ID,
        mockFunction,
      );

    // Assert
      expect(retrieveUnstakedAmountSpy).toBeCalledTimes(1);
      expect(retrieveUnstakedAmountSpy).toBeCalledWith(REQUEST_ID);
      expect(signAndSendSpy).toBeCalledTimes(1);
      expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
      expect(successCallback).toBeCalledTimes(1);
      expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, { 
        events: eventAndStatusMock.events, 
        status: eventAndStatusMock.status, 
        callback: mockFunction,
      });
      expect(mockFunction).toBeCalledTimes(1);
  });

  it('createRequest should return', async () => {
    // Arrange
    const PAIR = "PAIR";
    const COUNTRY_ID = "COUNTRY_ID";
    const REGION_ID = "REGION_ID";
    const CITY_ID = "CITY_ID";
    const CATEGORY_ID = "CATEGORY_ID";
    const STAKING_AMOUNT = 1;
    const EXPECTED_VALUE = 0;
    (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);
      
    // Act
    await createRequest(
      API_PROMISE_MOCK as any, 
      PAIR,
      COUNTRY_ID,
      REGION_ID,
      CITY_ID,
      CATEGORY_ID,
      STAKING_AMOUNT,
      mockFunction,
    );

    // Assert
    expect(createRequestSpy).toBeCalledTimes(1);
    expect(createRequestSpy).toBeCalledWith(COUNTRY_ID, REGION_ID, CITY_ID, CATEGORY_ID, STAKING_AMOUNT);
    expect(signAndSendSpy).toBeCalledTimes(1);
    expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
    expect(successCallback).toBeCalledTimes(1);
    expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, { 
      events: eventAndStatusMock.events, 
      status: eventAndStatusMock.status, 
      callback: mockFunction,
    });
    expect(mockFunction).toBeCalledTimes(1);
  });

  it('createRequestFee should return', () => {
    // Arrange
    const PAIR = "PAIR";
    const COUNTRY_ID = "COUNTRY_ID";
    const REGION_ID = "REGION_ID";
    const CITY_ID = "CITY_ID";
    const CATEGORY_ID = "CATEGORY_ID";
    const STAKING_AMOUNT = 1
    const EXPECTED_VALUE = 0;
    (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);
      
    // Assert
    expect(
      createRequestFee(
        API_PROMISE_MOCK as any, 
        PAIR,
        COUNTRY_ID,
        REGION_ID,
        CITY_ID,
        CATEGORY_ID,
        STAKING_AMOUNT,
      )).toEqual(EXPECTED_VALUE);
    expect(createRequestSpy).toBeCalledTimes(1);
    expect(createRequestSpy).toBeCalledWith(COUNTRY_ID, REGION_ID, CITY_ID, CATEGORY_ID, 1);
    expect(paymentInfoSpy).toBeCalledTimes(1);
    expect(paymentInfoSpy).toBeCalledWith(PAIR);
    expect(mockFunction).toBeCalledTimes(1);
  });

  it('unstakeRequestFee should return', () => {
    // Arrange
    const PAIR = "PAIR";
    const REQUEST_ID = "REQUEST_ID";
    const EXPECTED_VALUE = 0;
    (mockFunction as jest.Mock).mockReturnValue(EXPECTED_VALUE);
      
    // Assert
    expect(
      unstakeRequestFee(
        API_PROMISE_MOCK as any, 
        PAIR,
        REQUEST_ID,
      )).toEqual(EXPECTED_VALUE);
    expect(unstakeSpy).toBeCalledTimes(1);
    expect(unstakeSpy).toBeCalledWith(REQUEST_ID);
    expect(paymentInfoSpy).toBeCalledTimes(1);
    expect(paymentInfoSpy).toBeCalledWith(PAIR);
    expect(mockFunction).toBeCalledTimes(1);
  });

  it('generateRequestId should return', async () => {
    // Arrange
    const PAIR = "PAIR";
    const COUNTRY = "COUNTRY";
    const REGION = "REGION";
    const CITY = "CITY";
    const CATEGORY = "CATEGORY";
    
    // Act
    await generateRequestId(
      API_PROMISE_MOCK as any,
      PAIR,
      COUNTRY,
      REGION,
      CITY,
      CATEGORY,
      mockFunction,
    );

    // Assert
    expect(generateRequestidSpy).toBeCalledTimes(1);
    expect(generateRequestidSpy).toBeCalledWith(COUNTRY, REGION, CITY, CATEGORY);
    expect(signAndSendSpy).toBeCalledTimes(1);
    expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
    expect(successCallback).toBeCalledTimes(1);
    expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, { 
      events: eventAndStatusMock.events, 
      status: eventAndStatusMock.status, 
      callback: mockFunction,
    });
    expect(mockFunction).toBeCalledTimes(1);
  });

  it('unstakeRequest should return', async () => {
    // Arrange
    const PAIR = "PAIR";
    const REQUEST_ID = "REQUEST_ID";
      
    // Assert
    await unstakeRequest(
      API_PROMISE_MOCK as any, 
      PAIR,
      REQUEST_ID,
      mockFunction,
    );
    expect(unstakeSpy).toBeCalledTimes(1);
    expect(unstakeSpy).toBeCalledWith(REQUEST_ID);
    expect(signAndSendSpy).toBeCalledTimes(1);
    expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
    expect(successCallback).toBeCalledTimes(1);
    expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, { 
      events: eventAndStatusMock.events, 
      status: eventAndStatusMock.status, 
      callback: mockFunction,
    });
    expect(mockFunction).toBeCalledTimes(1);
  });

  it('claimRequest should return', async () => {
    // Arrange
    const PAIR = "PAIR";
    const REQUEST_ID = "REQUEST_ID";
    const SERVICE_ID = "SERVICE_ID";
    const TESTING_PRICE = "TESTING_PRICE";
    const QC_PRICE = "QC_PRICE";

    // Act
    await claimRequest(
      API_PROMISE_MOCK as any,
      PAIR,
      REQUEST_ID,
      SERVICE_ID,
      TESTING_PRICE,
      QC_PRICE,
      mockFunction,
    );

    // Assert
    expect(claimRequestSpy).toBeCalledTimes(1);
    expect(claimRequestSpy).toBeCalledWith(REQUEST_ID, SERVICE_ID, TESTING_PRICE, QC_PRICE);
    expect(signAndSendSpy).toBeCalledTimes(1);
    expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
    expect(successCallback).toBeCalledTimes(1);
    expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, { 
      events: eventAndStatusMock.events, 
      status: eventAndStatusMock.status, 
      callback: mockFunction,
    });
    expect(mockFunction).toBeCalledTimes(1);
  });

  it('processRequest should return', async () => {
    // Arrange
    const PAIR = "PAIR";
    const LAB_ID = "LAB_ID";
    const REQUEST_ID = "REQUEST_ID";
    const ORDER_ID = "ORDER_ID";
    const DNA_SAMPLE_TRACKING_ID = "DNA_SAMPLE_TRACKING_ID";
    const ADDITIONAL_STACKING_AMOUNT = "ADDITIONAL_STACKING_AMOUNT";

    // Act
    await processRequest(
      API_PROMISE_MOCK as any,
      PAIR,
      LAB_ID,
      REQUEST_ID,
      ORDER_ID,
      DNA_SAMPLE_TRACKING_ID,
      ADDITIONAL_STACKING_AMOUNT,
      mockFunction,
    );

    // Assert
    expect(processRequestSpy).toBeCalledTimes(1);
    expect(processRequestSpy).toBeCalledWith(LAB_ID, REQUEST_ID, ORDER_ID, DNA_SAMPLE_TRACKING_ID, ADDITIONAL_STACKING_AMOUNT);
    expect(signAndSendSpy).toBeCalledTimes(1);
    expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
    expect(successCallback).toBeCalledTimes(1);
    expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, { 
      events: eventAndStatusMock.events, 
      status: eventAndStatusMock.status, 
      callback: mockFunction,
    });
    expect(mockFunction).toBeCalledTimes(1);
  });

  it('finalizeRequest should return', async () => {
    // Arrange
    const PAIR = "PAIR";
    const REQUEST_ID = "REQUEST_ID";
    const TEST_RESULT_SUCCESS = true;

    // Act
    await finalizeRequest(
      API_PROMISE_MOCK as any,
      PAIR,
      REQUEST_ID,
      TEST_RESULT_SUCCESS,
      mockFunction,
    );

    // Assert
    expect(finalizeRequestSpy).toBeCalledTimes(1);
    expect(finalizeRequestSpy).toBeCalledWith(REQUEST_ID, TEST_RESULT_SUCCESS);
    expect(signAndSendSpy).toBeCalledTimes(1);
    expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
    expect(successCallback).toBeCalledTimes(1);
    expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, { 
      events: eventAndStatusMock.events, 
      status: eventAndStatusMock.status, 
      callback: mockFunction,
    });
    expect(mockFunction).toBeCalledTimes(1);
  });
})