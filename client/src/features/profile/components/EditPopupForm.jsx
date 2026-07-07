import React, { useState } from "react";
import InputField from "../../auth/components/InputField";

const EditPopupForm = ({ setIsEditPopUpOpen, userData }) => {
  console.log(userData);
  const [formData, setFormData] = useState({
    avatar: userData.avatar,
    username: userData.username,
    codeforcesHandle: userData.codeforcesHandle,
    leetcodeUsername: userData.leetcodeUsername,
    githubUsername: userData.githubUsername,
  });
 console.log(formData);
  return (
    <div className="w-full bg-transparent backdrop-blur-xl absolute right-0 top-0 h-screen max-h-screen z-10 flex items-center justify-center scrollbar-none ">
      <div className=" border border-accent flex flex-col">
        <div className="  flex items-center justify-between bg-accent p-2">
          <span className="text-black uppercase">
            node_configuration_protocol
          </span>
          <span className="text-black text-sm">v1.0.4_STABLE</span>
        </div>
        <div className="bg-surface p-4 flex flex-col gap-4">
          <form className="flex flex-col gap-2">
            <InputField
              label="identity_name"
              id="identity_name"
              type="text"
              placeholder="USER_ALPHA_DEV"
              value={formData.username}
              // onChange={handleChange}
            />
            <InputField
              label="external_node: github"
              id="identity_name"
              type="text"
              placeholder="github.com/alpha_arch"
              value={formData.githubUsername}
              // onChange={handleChange}
            />
            <InputField
              label="external_node: leetcode"
              id="identity_name"
              type="text"
              placeholder="leetcode.com/u/aplha"
              value={formData.leetcodeUsername}
              // onChange={handleChange}
            />
            <InputField
              label="external_node: codeforces"
              id="identity_name"
              type="text"
              placeholder="codeforces/profile/aplha"
              value={formData.codeforcesHandle}
              // onChange={handleChange}
            />
          </form>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setIsEditPopUpOpen(false)}
              className="col-span-2 py-2 px-4 text-black bg-accent hover:bg-white uppercase cursor-pointer"
            >
              save_changes
            </button>
            <button
              onClick={() => setIsEditPopUpOpen(false)}
              className="col-span-1 py-2 px-4 text-danger border border-danger hover:text-text-primary hover:bg-danger hover:border-danger uppercase cursor-pointer"
            >
              abort_session
            </button>
          </div>
        </div>
        <div className="bg-surface-2 flex p-2 justify-between items-center uppercase text-xs border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent animate-pulse"></div>
            <div className=" text-text-secondary">
              awaiting user confirmation...
            </div>
          </div>
          <span className="text-text-secondary">secure_uplink_active</span>
        </div>
      </div>
    </div>
  );
};

export default EditPopupForm;
