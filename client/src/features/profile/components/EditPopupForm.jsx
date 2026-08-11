import React, { useState } from "react";
import InputField from "../../auth/components/InputField";
import useUser from "../../user/hooks/useUser";
const PLATFORM_FIELDS = [
  "githubUsername",
  "leetcodeUsername",
  "codeforcesHandle",
];

const EditPopupForm = ({ setIsEditPopUpOpen, userData, update, userID }) => {
  const { checkHandle } = useUser();
  const [formData, setFormData] = useState({
    avatar: userData.avatar || "",
    username: userData.username || "",
    codeforcesHandle: userData.codeforcesHandle || "",
    leetcodeUsername: userData.leetcodeUsername || "",
    githubUsername: userData.githubUsername || "",
  });
  const [fieldStatus, setFieldStatus] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
  if (PLATFORM_FIELDS.includes(name)) {
    setFieldStatus((prev) => ({ ...prev, [name]: null }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  }
};

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    if (!PLATFORM_FIELDS.includes(name)) return;
    if (!value || value.trim() === "") return;

    setFieldStatus((prev) => ({ ...prev, [name]: "checking" }));
    const result = await checkHandle(name, value);
    setFieldStatus((prev) => ({
      ...prev,
      [name]: result.valid ? "valid" : "invalid",
    }));
    setFieldErrors((prev) => ({
      ...prev,
      [name]: result.valid ? undefined : result.reason,
    }));
    if (result.valid && result.username) {
      setFormData((prev) => ({ ...prev, [name]: result.username }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await update(userID, formData);
      if (data?.failures && Object.keys(data.failures).length > 0) {
        setFieldErrors((prev) => ({ ...prev, ...data.failures }));
        return;
      }
      setIsEditPopUpOpen(false);
    } catch (err) {
      // global error already set in useUser — popup stays open so the user can retry
    }
  };

  const badgeFor = (field) => {
    if (fieldStatus[field] === "checking") return "checking";
    if (fieldStatus[field] === "valid") return "verified";
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-surface-2/20 backdrop-blur-xs"></div>
      <div className="w-full bg-transparent backdrop-blur-xl absolute right-0 top-0 h-screen max-h-screen z-10 flex items-center justify-center scrollbar-none font-sans ">
        <div className=" border border-accent flex flex-col">
          <div className="  flex items-center justify-between bg-accent p-2">
            <span className="text-black uppercase">
              node_configuration_protocol
            </span>
            <span className="text-black text-sm">v1.0.4_STABLE</span>
          </div>
          <div className="bg-surface p-4 flex flex-col gap-4">
            <form className="flex flex-col gap-2 " onSubmit={handleSubmit}>
              <div className="grid grid-cols-4 items-center">
                <div className="h-20 w-20 bg-surface-2 col-span-1 flex items-center justify-center border border-accent overflow-hidden ">
                  {formData.avatar ? (
                    <img
                      src={formData.avatar}
                      alt="USER_AVAYAR"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center text-5xl ">
                      U
                    </div>
                  )}
                </div>
                <div className="col-span-3">
                  <InputField
                    label="avatar_url"
                    name="avatar"
                    id="avatar"
                    type="text"
                    placeholder="https://imageurl.com"
                    value={formData.avatar}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <InputField
                label="identity_name"
                name="username"
                id="identity_name"
                type="text"
                placeholder="USER_ALPHA_DEV"
                value={formData.username}
                onChange={handleChange}
              />

              <InputField
                label="external_node: github"
                name="githubUsername"
                id="github"
                type="text"
                placeholder="github.com/alpha_arch"
                value={formData.githubUsername}
                onChange={handleChange}
                onBlur={handleBlur}
                error={fieldErrors.githubUsername}
                define={badgeFor("githubUsername")}
              />

              <InputField
                label="external_node: leetcode"
                name="leetcodeUsername"
                id="leetcode"
                type="text"
                placeholder="leetcode.com/u/alpha"
                value={formData.leetcodeUsername}
                onChange={handleChange}
                onBlur={handleBlur}
                error={fieldErrors.leetcodeUsername}
                define={badgeFor("leetcodeUsername")}
              />

              <InputField
                label="external_node: codeforces"
                name="codeforcesHandle"
                id="codeforces"
                type="text"
                placeholder="codeforces/profile/alpha"
                value={formData.codeforcesHandle}
                onChange={handleChange}
                onBlur={handleBlur}
                error={fieldErrors.codeforcesHandle}
                define={badgeFor("codeforcesHandle")}
              />
            </form>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={handleSubmit}
                type="submit"
                className="col-span-2 py-2 px-4 text-black bg-accent hover:bg-white uppercase cursor-pointer active:scale-95"
              >
                commit_changes
              </button>
              <button
                onClick={() => setIsEditPopUpOpen(false)}
                className="col-span-1 py-2 px-4 text-danger border border-danger hover:text-text-primary hover:bg-danger hover:border-danger uppercase cursor-pointer active:scale-95"
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
    </div>
  );
};

export default EditPopupForm;
