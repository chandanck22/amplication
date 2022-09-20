import { EnumPanelStyle, Icon, Panel } from "@amplication/design-system";
import React, { useCallback, useContext, useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import { ClickableId } from "../Components/ClickableId";
import ResourceCircleBadge from "../Components/ResourceCircleBadge";
import { AppContext } from "../context/appContext";
import { Build } from "../models";
import { BuildStatusIcon } from "./BuildStatusIcon";
import "./CommitResourceListItem.scss";
import useCommits from "./hooks/useCommits";

const CLASS_NAME = "commit-resource-list-item";

type Props = {
  build: Build;
};

const CommitResourceListItem = ({ build }: Props) => {
  const { currentWorkspace, currentProject } = useContext(AppContext);
  const { commitChangesByResource } = useCommits();

  const handleBuildLinkClick = useCallback((event) => {
    event.stopPropagation();
  }, []);

  const resourceChangesCount = useMemo(() => {
    const resourcesChanges = commitChangesByResource(build.commitId);
    return resourcesChanges.find(
      (resourceChanges) => resourceChanges.resourceId === build.resourceId
    )?.changes.length;
  }, [build.commitId, build.resourceId, commitChangesByResource]);

  return (
    <NavLink
      to={`/${currentWorkspace?.id}/${currentProject?.id}/${build.resourceId}/builds/${build.id}`}
    >
      {build && build.resource && (
        <Panel
          className={CLASS_NAME}
          clickable
          panelStyle={EnumPanelStyle.Bordered}
        >
          <div className={`${CLASS_NAME}__row`}>
            <ResourceCircleBadge type={build.resource.resourceType} />

            <div className={`${CLASS_NAME}__title`}>
              <Link
                to={`/${currentWorkspace?.id}/${currentProject?.id}/${build.resourceId}`}
              >
                {build.resource.name}
                <Icon icon="link" size="xsmall" />
              </Link>
            </div>

            <span className="spacer" />
            <Link
              to={`/${currentWorkspace?.id}/${currentProject?.id}/${build.resourceId}/changes/${build.commitId}`}
              className={`${CLASS_NAME}__changes-count`}
            >
              {resourceChangesCount && resourceChangesCount > 0
                ? resourceChangesCount
                : 0}{" "}
              changes
            </Link>
          </div>
          <hr className={`${CLASS_NAME}__divider`} />
          <div className={`${CLASS_NAME}__row`}>
            <BuildStatusIcon buildStatus={build.status} />
            <ClickableId
              label="Build ID"
              to={`/${currentWorkspace?.id}/${currentProject?.id}/${build.resourceId}/builds/${build.id}`}
              id={build.id}
              onClick={handleBuildLinkClick}
              eventData={{
                eventName: "commitListBuildIdClick",
              }}
            />
          </div>
        </Panel>
      )}
    </NavLink>
  );
};

export default CommitResourceListItem;