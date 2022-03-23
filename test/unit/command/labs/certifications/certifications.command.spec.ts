import { successCallback } from "../../../../../src";
import { createCertification, updateCertification, deleteCertification } from "../../../../../src/command/labs/certification";
import { ApiPromise, eventAndStatusMock, signAndSendWithPaymentInfo } from "../../../@polkadot-api.mock";
import { mockFunction } from "../../../mock";
import { certificationDataMock } from "../../../models/labs/certifications.mock";
import { certifications } from "./certifications.command.mock";

jest.mock('../../../mock', () => ({
  mockFunction: jest.fn(),
}));

jest.mock('../../../../../src/index', () => ({
  successCallback: jest.fn(() => mockFunction()),
}));

describe('Certifications Command Unit Tests', () => {
  const API_PROMISE_MOCK: ApiPromise = new ApiPromise();
  API_PROMISE_MOCK.tx = { certifications: certifications };

  const signAndSendSpy = jest.spyOn(signAndSendWithPaymentInfo, 'signAndSend');
  const paymentInfoSpy = jest.spyOn(signAndSendWithPaymentInfo, 'paymentInfo');
  const createCertificationSpy = jest.spyOn(certifications, 'createCertification');
  const updateCertificationSpy = jest.spyOn(certifications, 'updateCertification');
  const deleteCertificationSpy = jest.spyOn(certifications, 'deleteCertification');

  beforeEach(() => {
    (mockFunction as jest.Mock).mockClear();
    (successCallback as jest.Mock).mockClear();
    signAndSendSpy.mockClear();
    paymentInfoSpy.mockClear();
    createCertificationSpy.mockClear();
    updateCertificationSpy.mockClear();
    deleteCertificationSpy.mockClear();
  });

  it('create Certification should return', async () => {
    // Arrange
    const PAIR = "PAIR";
    const CERTIFICATION_INFO = certificationDataMock.info;
    const CERTIFICATION_FLOW = 'CERTIFICATION_FLOW';

    // Act
    await createCertification(
      API_PROMISE_MOCK as any, 
      PAIR,
      CERTIFICATION_INFO,
      mockFunction
    );
      
    // Assert
    expect(createCertificationSpy).toBeCalledTimes(1);
    expect(createCertificationSpy).toBeCalledWith(CERTIFICATION_INFO);
    expect(signAndSendSpy).toBeCalledTimes(1);
    expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
    expect(successCallback).toBeCalledTimes(1);
    expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, {
        events: eventAndStatusMock.events,
        status: eventAndStatusMock.status,
        callback: mockFunction
    });
    expect(mockFunction).toBeCalledTimes(1);
  });

  it('update certification should return', async () => {
    // Arrange
    const PAIR = "PAIR";
    const CERTIFICATION_ID = "CERTIFICATION_ID";
    const CERTIFICATION_INFO = certificationDataMock.info;

    // Act
    await updateCertification(
      API_PROMISE_MOCK as any, 
      PAIR,
      CERTIFICATION_ID,
      CERTIFICATION_INFO,
      mockFunction
    );
      
    // Assert
    expect(updateCertificationSpy).toBeCalledTimes(1);
    expect(updateCertificationSpy).toBeCalledWith(CERTIFICATION_ID, CERTIFICATION_INFO);
    expect(signAndSendSpy).toBeCalledTimes(1);
    expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
    expect(successCallback).toBeCalledTimes(1);
    expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, {
        events: eventAndStatusMock.events,
        status: eventAndStatusMock.status,
        callback: mockFunction
    });
    expect(mockFunction).toBeCalledTimes(1);
  });

  it('delete certification should return', async () => {
    // Arrange
    const PAIR = "PAIR";
    const CERTIFICATION_ID = "CERTIOFICATION_ID";

    // Act
    await deleteCertification(
      API_PROMISE_MOCK as any, 
      PAIR,
      CERTIFICATION_ID,
      mockFunction
    );
      
    // Assert
    expect(deleteCertificationSpy).toBeCalledTimes(1);
    expect(deleteCertificationSpy).toBeCalledWith(CERTIFICATION_ID);
    expect(signAndSendSpy).toBeCalledTimes(1);
    expect(signAndSendSpy).toBeCalledWith(PAIR, { nonce: -1 }, expect.any(Function));
    expect(successCallback).toBeCalledTimes(1);
    expect(successCallback).toBeCalledWith(API_PROMISE_MOCK, {
        events: eventAndStatusMock.events,
        status: eventAndStatusMock.status,
        callback: mockFunction
    });
    expect(mockFunction).toBeCalledTimes(1);
  });
});