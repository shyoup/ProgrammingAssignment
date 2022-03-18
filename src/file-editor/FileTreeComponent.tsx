import React from 'react';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import useStore from 'hooks/util/UseStore';
import { observer } from 'mobx-react';
import { styled } from '@mui/system';

const StyledTreeView = styled(TreeView)({
  width: '600px',
});

type InputProps = {
  depthPadding: number;
  iconVisibility: string;
};

const StyledTreeItem = styled(TreeItem)<InputProps>(({ depthPadding, iconVisibility }) => ({
  [`& .MuiTreeItem-content`]: {
    color: 'white',
    fontSize: '14px',
    [`& .MuiTreeItem-iconContainer`]: {
      visibility: iconVisibility,
      marginLeft: `${depthPadding}px`,
      backgroundColor: 'white',
      width: '12px',
      height: '12px',
      border: '1px solid',
      borderRadius: '2px',
    },
  },
  [`& .MuiTreeItem-group`]: {
    marginLeft: 0,
  },
}));

export interface TreeInfo {
  id: string;
  name: string;
  children?: TreeInfo[];
}

export const FileTreesComponent: React.FC = () => {
  const { fileStore, tabStore } = useStore();
  const renderTree = (nodes: TreeInfo, depth: number) => (
    <StyledTreeItem
      iconVisibility={Array.isArray(nodes.children) ? 'visible' : 'hidden'}
      key={nodes.id}
      nodeId={nodes.id}
      label={
        nodes.name[nodes.name.length -1] === '/' ?
        nodes.name.substring(nodes.name.substring(0, nodes.name.lastIndexOf('/')).lastIndexOf('/') + 1) :
        nodes.name.substring(nodes.name.lastIndexOf('/') + 1)
      }
      depthPadding={depth * 20}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map(node => renderTree(node, depth + 1))
        : undefined}
    </StyledTreeItem>
  );
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    const isFolder = fileStore.getFileById(newValue) ? false : true;
    tabStore.setCurTab(newValue, isFolder);
    fileStore.openFile(newValue);
  };
  return (
    <div
      style={{
        width: '350px',
        overflowX: 'hidden',
      }}
    >
      <StyledTreeView
        aria-label=""
        onNodeSelect={handleChange}
      >
        {fileStore.getFoldersList().map(info => {
          return renderTree(info, 0);
        })}
        {fileStore.getFilesList().map(info => {
          if (!info.name.includes('/')) {
            return <StyledTreeItem key={info.id} nodeId={info.id} depthPadding={0} iconVisibility={'hidden'} label={info.name} />
          }
        })}
      </StyledTreeView>
    </div>
  );
};
export default observer(FileTreesComponent);
