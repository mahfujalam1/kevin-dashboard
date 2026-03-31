import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import CustomButton from "../../utils/CustomButton";
import { useGetTermsQuery } from "../../redux/features/Terms&policy/terms-policy";

const TermsConditions = () => {
  const token = localStorage.getItem("token");
  const { data } = useGetTermsQuery();
  const terms = data;

  return (
    <section
      className={`${!token ? "max-w-7xl mx-auto px-10" : "px-5 text-lg text-black"} `}
    >
      <div className="flex justify-between items-center py-5">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold">Terms & Conditions</h1>
        </div>
        {token && (
          <Link to={"/settings/edit-terms-conditions/11"}>
            <CustomButton border>
              <TbEdit className="size-5" />
              <span>Edit</span>
            </CustomButton>
          </Link>
        )}
      </div>

      <div className="px-5 text-lg text-black">
        <div
          dangerouslySetInnerHTML={{
            __html:
              terms?.data?.content ||
              "<p>No Terms and Conditions available.</p>",
          }}
        />
      </div>
    </section>
  );
};

export default TermsConditions;
