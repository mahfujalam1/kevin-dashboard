import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import CustomButton from "../../utils/CustomButton";
import { useGetPolicyQuery } from "../../redux/features/Terms&policy/terms-policy";

const PrivacyPolicyPage = () => {
  const token = localStorage.getItem("token");
  const { data } = useGetPolicyQuery();
  const policy = data;
  return (
    <section
      className={`${!token ? "max-w-7xl mx-auto px-10" : "px-5 text-lg text-black"} `}
    >
      <div className="flex justify-between items-center py-5">
        <div className="flex  items-center">
          <h1 className="text-2xl font-semibold">Privacy Policy</h1>
        </div>
      </div>
      {token && (
        <Link to={"/settings/edit-privacy-policy/11"}>
          <CustomButton border>
            <TbEdit className="size-5" />
            <span>Edit</span>
          </CustomButton>
        </Link>
      )}
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: policy?.data?.content || "",
          }}
        />
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;
