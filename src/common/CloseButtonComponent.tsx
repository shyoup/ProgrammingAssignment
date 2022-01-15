import React from 'react';

interface Props {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CloseButtonComponent: React.FC<Props> = (props: Props) => {
  const { onClick } = props;
  return (
    <button
      style={{
        fontWeight: '600',
        color: 'white',
        backgroundColor: 'transparent',
      }}
      onClick={e => {
        if (onClick !== undefined) onClick(e);
      }}
    >X
    </button>
  );
};

CloseButtonComponent.defaultProps = {
  onClick: undefined,
};

export default CloseButtonComponent;
