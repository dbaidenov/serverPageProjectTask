import "./resourceNames.scss";
import { FC } from "react";
import { resourcesList } from "../../../localdata/resource-container/resources";

interface ResourceNamesProps {
  currentResourceId: number;
  handleCurrentResourceId: (itemId: number) => void;
  floatBorderIndex: number;
}

const ResourceNames: FC<ResourceNamesProps> = ({
  currentResourceId,
  handleCurrentResourceId,
  floatBorderIndex,
}) => {
  // функция для сортировки при мобилке
  const handleWindowResize = () => {
    if (window.innerWidth > 670) return resourcesList;

    return resourcesList.sort((a, b) => {
      if (a.id === currentResourceId) return 1;
      if (b.id === currentResourceId) return -1;
      return 0;
    });
  };

  return (
    <div className="resource__names">
      {handleWindowResize().map((item) => (
        <div
          key={item.id}
          onClick={() => handleCurrentResourceId(item.id)}
          className={`resource__name ${
            floatBorderIndex === item.id ? "selected" : ""
          }`}
          style={{
            color:
              item.name === "Мои конфигурации"
                ? "rgba(100, 110, 115, 0.7)"
                : "#3e515b",
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default ResourceNames;
