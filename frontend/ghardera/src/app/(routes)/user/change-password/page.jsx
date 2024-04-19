"use client";

import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { PasswordInput, Button } from "@mantine/core";

const ChangePassword = () => {
  const [visible, { toggle }] = useDisclosure(false);

  return (
    <>
      <div className="mt-5">
        <div className="text-2xl semi-bold">
          <h1>Change Your Password</h1>
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <div>
            <PasswordInput
              label="Old Password"
              // error="old password didn't match"
              placeholder="Enter Old Password"
            />
          </div>
          <div>
            <PasswordInput
              label="New Password"
              // error="old password didn't match"
              placeholder="Enter New Password"
            />
          </div>
          <div>
            <PasswordInput
              label="Confirm New Password"
              // error="old password didn't match"
              placeholder="Enter New Password"
            />
          </div>
          <div className="flex justify-around mt-5">
            <div>
              <Button variant="filled">Update</Button>
            </div>
            <div>
              <Button variant="filled" color="red">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
