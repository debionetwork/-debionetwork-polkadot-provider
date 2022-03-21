export const geneticAnalystServiceMock = {
	id: 'string',
	ownerId: 'string',
	info: {
		name: 'string',
		pricesByCurrency: [
			{
				currency: 'string',
				totalPrice: 0,
				priceComponents: [
					{
						component: 'string',
						value: 0
					}
				],
				additionalPrices: [],
			},
		],
		expectedDuration: {
			duration: '1',
			durationType: 'string',
		},
		description: 'string',
		testResultSample: 'string',
	}
}