import "./resourceContainer.scss";
import { FC, useState } from "react";
import { resourcesList } from "../../localdata/resource-container/resources";
import ResourceNames from "./resourceNames/ResourceNames";

interface ResourceContainerProps {}

const ResourceContainer: FC<ResourceContainerProps> = () => {
  // айди текущего ресурса
  const [currentResourceId, setCurrentResourceID] = useState<number>(
    resourcesList[0].id
  );

  // состояние для border стиля активного ресурса
  const [floatBorderIndex, setFloatBorderIndex] = useState<number>(
    resourcesList[0].id
  );

  // обработчик текущего ресурса
  const handleCurrentResourceId = function (itemId: number) {
    setCurrentResourceID(itemId);
    setFloatBorderIndex(itemId);
  };

  // текущий ресурс
  const curResource = resourcesList.find(
    (item) => item.id === currentResourceId
  );

  return (
    <>
      <div className="resource-container__title">Ресурсы</div>
      {/* названия ресурсов */}
      <ResourceNames
        currentResourceId={currentResourceId}
        handleCurrentResourceId={handleCurrentResourceId}
        floatBorderIndex={floatBorderIndex}
      />
      {/* контент ресурсов */}
      <div
        className={
          !!curResource?.resources
            ? "resource-container"
            : "resource-container-notavailable"
        }
      >
        {curResource && !!curResource.resources ? (
          // возвращаемый контент при наличии ресурсов
          curResource.resources.map((resource, index) => (
            <div key={index} className="resource">
              {resource.map((value, innerIndex) => (
                <span key={innerIndex}>
                  <span className="resource__count">{value.count}</span>{" "}
                  {value.name} {innerIndex === 0 ? " / " : ""}
                </span>
              ))}
            </div>
          ))
        ) : (
          // возвращаемый контент при отсутствии ресурсов
          <div
            key={currentResourceId}
            className={`resource-notavailable shake`}
          >
            {curResource?.noResources}
          </div>
        )}
      </div>
    </>
  );
};

export default ResourceContainer;
