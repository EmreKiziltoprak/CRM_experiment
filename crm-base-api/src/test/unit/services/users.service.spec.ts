import { Users } from "../../../models/users/Users";
import { UsersRepository } from "../../../repositories/UsersRepository";
import { UsersService } from "../../../services/UsersService";

jest.mock('../../../repositories/UsersRepository');

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: jest.Mocked<UsersRepository>;

  beforeEach(() => {
    usersRepository = new UsersRepository() as jest.Mocked<UsersRepository>;
    usersService = new UsersService(usersRepository);
  });

  describe('findByEmail', () => {
    it('should return a user if found', async () => {
      const user: Users = {
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
        userId: 1,
        roleId: 1
      };
      usersRepository.findByEmail.mockResolvedValue(user);

      const result = await usersService.findByEmail('test@example.com');

      expect(result).toBe(user);
      expect(usersRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(usersRepository.findByEmail).toHaveBeenCalledTimes(1);
    });

    it('should return null if user not found', async () => {
      usersRepository.findByEmail.mockResolvedValue(null);

      const result = await usersService.findByEmail('nonexistent@example.com');

      expect(result).toBeNull();
      expect(usersRepository.findByEmail).toHaveBeenCalledWith('nonexistent@example.com');
      expect(usersRepository.findByEmail).toHaveBeenCalledTimes(1);
    });
  });

  describe('createUser', () => {
    it('should create and return a user', async () => {
      const user: Users = {
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
        userId: 1,
        roleId: 1
      };
      usersRepository.createUser.mockResolvedValue(user);

      const result = await usersService.createUser(user);

      expect(result).toStrictEqual(user);
      expect(usersRepository.createUser).toHaveBeenCalledWith(user); // Jest matcher that checks if the function was called with the argument user
      expect(usersRepository.createUser).toHaveBeenCalledTimes(1); // Jest matcher that checks if the function was called exactly one time
    });

    it('should throw an error if password is missing', async () => {
      const user: Users = {
        email: 'test@example.com',
        password: '', // Password is missing
        username: 'testuser',
        userId: 1,
        roleId: 1
      };

      await expect(usersService.createUser(user)).rejects.toThrow('Password is required');
      expect(usersRepository.createUser).not.toHaveBeenCalled();
    });

    it('should rethrow any errors from the repository', async () => {
      const user: Users = {
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
        userId: 1,
        roleId: 1
      };
      const error = new Error('Repository error');
      usersRepository.createUser.mockRejectedValue(error);

      await expect(usersService.createUser(user)).rejects.toThrow('Repository error');
      expect(usersRepository.createUser).toHaveBeenCalledWith(user);
      expect(usersRepository.createUser).toHaveBeenCalledTimes(1);
    });
  });
});
