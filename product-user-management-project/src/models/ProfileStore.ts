import { types } from "mobx-state-tree";

interface UserProfile {
  id: string;
  email: string;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

export const UserProfileModel = types.model("UserProfileModel", {
  id: types.identifier,
  email: types.string,
  family_name: types.string,
  given_name: types.string,
  locale: types.string,
  name: types.string,
  picture: types.string,
  verified_email: types.boolean,
});

export const ProfileStore = types
  .model({
    profile: types.maybeNull(UserProfileModel),
  })
  .views((self) => ({}))
  .actions((self) => {
    return {
      setProfile(profile: any) {
        self.profile = profile;
      },
    };
  });
