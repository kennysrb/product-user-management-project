import axios from "axios";
import { cast, types } from "mobx-state-tree";

interface Address {
  address: string;
  state: string;
  city: string;
  postalcode: string;
}

interface User {
  id: number;
  image: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
}
export const UserModel = types.model("UserModel", {
  id: types.identifierNumber,
  image: types.string,
  firstName: types.string,
  lastName: types.string,
  age: types.number,
  gender: types.string,
  email: types.string,
  phone: types.string,
});

export const UserStore = types
  .model({
    users: types.array(UserModel),
    singleUser: types.maybeNull(UserModel),
  })
  .views((self) => ({}))
  .actions((self) => {
    return {
      setUsers(user: any[]) {
        self.users = cast(user.map((u) => UserModel.create(u)));
      },
      setSingleUser(user: User) {
        self.singleUser = cast(user);
      },
      removeSingleUser() {
        self.singleUser = null;
      },
      async getUsers() {
        try {
          const response = await axios.get("https://dummyjson.com/users");
          this.setUsers(Array.from(response.data.users));
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      },
      async getSingleUser(id: number) {
        try {
          const response = await axios.get(`https://dummyjson.com/users/${id}`);
          this.setSingleUser(response.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      },
      async deleteUser(id: number) {
        try {
          const response = await fetch(`https://dummyjson.com/users/${id}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Failed to delete user.");
          }

          const data = await response.json();
          console.log(data);
          console.log("User deleted successfully!");
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      },
      updateUser(id: any, user: any) {
        fetch(`https://dummyjson.com/users/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((error) => console.error("Error:", error));
      },
      searchUsers(search: string) {
        axios
          .get(`https://dummyjson.com/users/search?q=${search}`)
          .then((res) => this.setUsers(res.data.users))
          .catch((error) => console.error("Error:", error));
      },

      createNewUser(user: {}) {
        axios
          .post("https://dummyjson.com/users/add", user)
          .then((res) => console.log(res.data))
          .catch((error) => console.error("Error:", error));
      },
    };
  });
