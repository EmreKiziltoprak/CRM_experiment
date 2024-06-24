import { UserDetails } from "../../../models/userdetails/UserDetails";
import { Users } from "../../../models/users/Users";
import { UserInfoResponse } from "../../../models/users/payload/response/UserInfoResponse";
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
      const userDetails: UserDetails = {
        detailId: 1,
        firstName: 'John',
        lastName: 'Doe',
        language: 'en',
        dateFormat: 'MM/DD/YYYY',
        phoneNumber: '1234567890',
        profilePicture: 'profile.jpg',
        user: undefined // You can omit this if it's circular
      };

      const user: Users = {
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
        userId: 1,
        roleId: 1,
        userDetails: userDetails
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
      const userDetails: UserDetails = {
        detailId: 1,
        firstName: 'John',
        lastName: 'Doe',
        language: 'en',
        dateFormat: 'MM/DD/YYYY',
        phoneNumber: '1234567890',
        profilePicture: 'profile.jpg',
        user: undefined // You can omit this if it's circular
      };

      const user: Users = {
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
        userId: 1,
        roleId: 1,
        userDetails: userDetails
      };
      usersRepository.createUser.mockResolvedValue(user);

      const result = await usersService.createUser(user);

      expect(result).toStrictEqual(user);
      expect(usersRepository.createUser).toHaveBeenCalledWith(user); // Jest matcher that checks if the function was called with the argument user
      expect(usersRepository.createUser).toHaveBeenCalledTimes(1); // Jest matcher that checks if the function was called exactly one time
    });

    it('should throw an error if password is missing', async () => {
      const user = {
        email: 'test@example.com',
        username: 'testuser',
        roleId: 1
      } as Users;

      await expect(usersService.createUser(user)).rejects.toThrow('Password is required');
      expect(usersRepository.createUser).not.toHaveBeenCalled();
    });

    it('should rethrow any errors from the repository', async () => {
      const user: Users = {
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
        userId: 1,
        roleId: 1,
        userDetails: undefined
      };
      const error = new Error('Repository error');
      usersRepository.createUser.mockRejectedValue(error);

      await expect(usersService.createUser(user)).rejects.toThrow('Repository error');
      expect(usersRepository.createUser).toHaveBeenCalledWith(user);
      expect(usersRepository.createUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserInfo', () => {
    it('should return user info when user details are found', async () => {
      const userDetails: UserDetails = {
        detailId: 1,
        firstName: 'John',
        lastName: 'Doe',
        language: 'en',
        dateFormat: 'MM/DD/YYYY',
        phoneNumber: '1234567890',
        profilePicture: 'profile.jpg',
        user: undefined // Assuming UserDetails has a relation to Users
      };

      usersRepository.findUserDetailsByUserId.mockResolvedValue(userDetails);

      const expectedUserInfo: UserInfoResponse = {
        firstName: 'John',
        lastName: 'Doe',
        language: 'en',
        dateFormat: 'MM/DD/YYYY',
        phoneNumber: '1234567890',
        profilePicture: 'profile.jpg'
      };

      const result = await usersService.getUserInfo(1);

      expect(result).toStrictEqual(expectedUserInfo);
      expect(usersRepository.findUserDetailsByUserId).toHaveBeenCalledWith(1);
      expect(usersRepository.findUserDetailsByUserId).toHaveBeenCalledTimes(1);
    });

    it('should return user info with username and email when user is found', async () => {
      const user: Users = {
          userId: 1,
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
          roleId: 1,
          userDetails: undefined,
      };
  
      usersRepository.findUserDetailsByUserId.mockResolvedValue(user);
  
      const expectedUserInfo: UserInfoResponse = {
          firstName: undefined,
          lastName: undefined,
          language: undefined,
          dateFormat: undefined,
          phoneNumber: undefined,
          profilePicture: undefined
      };
  
      const result = await usersService.getUserInfo(1);
  
      expect(result).toStrictEqual(expectedUserInfo);
      expect(usersRepository.findUserDetailsByUserId).toHaveBeenCalledWith(1);
      expect(usersRepository.findUserDetailsByUserId).toHaveBeenCalledTimes(1);
  });
  

    it('should return null if user details are not found', async () => {
      usersRepository.findUserDetailsByUserId.mockResolvedValue(null);

      const result = await usersService.getUserInfo(1);

      expect(result).toBeNull();
      expect(usersRepository.findUserDetailsByUserId).toHaveBeenCalledWith(1);
      expect(usersRepository.findUserDetailsByUserId).toHaveBeenCalledTimes(1);
    });
  });


});
