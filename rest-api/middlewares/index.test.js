const usersApi = require('../services/usersApi');

describe('authenticateUser middleware', () => {
  it('should call usersApi.authenticateUser with the correct parameters', async () => {
    // Arrange
    const username = 'testUser';
    const authToken = 'testToken';

    usersApi.authenticateUser = jest.fn();
    await authenticateUserMiddleware(username, authToken);
    expect(usersApi.authenticateUser).toHaveBeenCalledWith(username, authToken);
  });

});