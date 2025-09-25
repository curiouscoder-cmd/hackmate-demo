import { UserService } from "./user-service"; // Assuming user-service.ts exists in the same directory

// Mock the database interaction (replace with your actual database interaction method)
jest.mock("./user-repository", () => ({
  UserRepository: {
    createUser: jest.fn(),
    getUserById: jest.fn(),
  },
}));

import { UserRepository } from "./user-repository"; // Import the mocked repository


describe("UserService", () => {
  let userService: UserService;
  const mockUserRepository = UserRepository as jest.Mocked<typeof UserRepository>;

  beforeEach(() => {
    userService = new UserService();
    // Reset mocks before each test
    mockUserRepository.createUser.mockReset();
    mockUserRepository.getUserById.mockReset();
  });


  it("should successfully create a user", async () => {
    const mockUser = { id: 1, name: "Test User", email: "test@example.com" };
    mockUserRepository.createUser.mockResolvedValue(mockUser);

    const createdUser = await userService.createUser(mockUser.name, mockUser.email);

    expect(createdUser).toEqual(mockUser);
    expect(mockUserRepository.createUser).toHaveBeenCalledWith(mockUser.name, mockUser.email);
  });

  it("should handle errors during user creation", async () => {
    const mockError = new Error("Failed to create user");
    mockUserRepository.createUser.mockRejectedValue(mockError);

    try {
      await userService.createUser("Error User", "error@example.com");
      fail("Expected an error to be thrown"); //Fail if the expected error is not thrown.
    } catch (error) {
      expect(error).toBe(mockError);
      expect(mockUserRepository.createUser).toHaveBeenCalledWith("Error User", "error@example.com");
    }
  });

  it("should successfully retrieve a user by ID", async () => {
    const mockUser = { id: 1, name: "Test User", email: "test@example.com" };
    mockUserRepository.getUserById.mockResolvedValue(mockUser);

    const retrievedUser = await userService.getUserById(1);

    expect(retrievedUser).toEqual(mockUser);
    expect(mockUserRepository.getUserById).toHaveBeenCalledWith(1);
  });


  it("should handle errors during user retrieval", async () => {
    const mockError = new Error("Failed to retrieve user");
    mockUserRepository.getUserById.mockRejectedValue(mockError);

    try {
      await userService.getUserById(999);
      fail("Expected an error to be thrown");
    } catch (error) {
      expect(error).toBe(mockError);
      expect(mockUserRepository.getUserById).toHaveBeenCalledWith(999);
    }
  });

  it("should handle the case where a user is not found", async () => {
      mockUserRepository.getUserById.mockResolvedValue(null);
      const retrievedUser = await userService.getUserById(1);
      expect(retrievedUser).toBeNull();
      expect(mockUserRepository.getUserById).toHaveBeenCalledWith(1);
  });
});