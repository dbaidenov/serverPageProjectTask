import "./createServer.scss";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "../../components/sidebar/Sidebar";
import ResourceContainer from "../../components/resourceContainer/ResourceContainer";
import InputContainer from "../../components/inputContainer/InputContainer";

const CreateServer: FC = () => {
  const { t } = useTranslation(["headContainer"]);

  return (
    <div className="main-container">
      <Sidebar />

      <main>
        <div className="container">
          {/* хотел тут сделать breadcrumbs, 
          но так как надо было сделать только одну страницу, не видел смысла, поэтому сделал статично  */}
          <div className="head-container__breadcrumbs">
            {t("breadcrumbs", { ns: ["headContainer"] })}
          </div>
          <h1>{t("headTitle", { ns: ["headContainer"] })}</h1>
          <p>{t("headDescription", { ns: ["headContainer"] })}</p>
        </div>

        <div className="container">
          <InputContainer />
        </div>

        <div className="container">
          <ResourceContainer />
        </div>
      </main>
    </div>
  );
};

export default CreateServer;
