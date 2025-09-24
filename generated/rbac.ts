```typescript
// Define interfaces for users, roles, and permissions
interface User {
  id: number;
  username: string;
  roles: string[];
}

interface Role {
  name: string;
  permissions: string[];
}

interface Resource {
  id: number;
  name: string;
}

// In-memory data store (replace with a database in a production environment)
let users: User[] = [];
let roles: Role[] = [];
let resources: Resource[] = [];


// Function to add a new user
function addUser(user: User): User | null {
  try {
    //Check for duplicate usernames
    if (users.find(u => u.username === user.username)) {
      throw new Error("Username already exists");
    }
    const newUser = { ...user, id: users.length + 1 };
    users.push(newUser);
    return newUser;
  } catch (error: any) {
    console.error("Error adding user:", error.message);
    return null;
  }
}

// Function to add a new role
function addRole(role: Role): Role | null {
    try {
        if (roles.find(r => r.name === role.name)) {
            throw new Error("Role already exists");
        }
        roles.push(role);
        return role;
    } catch (error: any) {
        console.error("Error adding role:", error.message);
        return null;
    }
}


// Function to add a new resource
function addResource(resource: Resource): Resource | null {
    try {
        if (resources.find(r => r.name === resource.name)) {
            throw new Error("Resource already exists");
        }
        const newResource = { ...resource, id: resources.length + 1 };
        resources.push(newResource);
        return newResource;
    } catch (error: any) {
        console.error("Error adding resource:", error.message);
        return null;
    }
}


// Function to check if a user has permission to access a resource
function hasPermission(userId: number, resourceId: number, permission: string): boolean {
  const user = users.find((user) => user.id === userId);
  const resource = resources.find((resource) => resource.id === resourceId);

  if (!user || !resource) {
    return false; // User or resource not found
  }

  for (const roleName of user.roles) {
    const role = roles.find((role) => role.name === roleName);
    if (role && role.permissions.includes(permission)) {
      return true;
    }
  }

  return false;
}

// Example usage
const adminRole: Role = { name: "admin", permissions: ["read", "write", "delete"] };
const editorRole: Role = { name: "editor", permissions: ["read", "write"] };

addRole(adminRole);
addRole(editorRole);

const user1: User = { id: 1, username: "user1", roles: ["admin"] };
const user2: User = { id: 2, username: "user2", roles: ["editor"] };

addUser(user1);
addUser(user2);

const resource1: Resource = { id: 1, name: "document1" };
addResource(resource1);


console.log(hasPermission(1, 1, "read")); // true
console.log(hasPermission(2, 1, "delete")); // false
console.log(hasPermission(3,1,"read")); //false - user not found
console.log(hasPermission(2,2,"read")); //false - resource not found

```