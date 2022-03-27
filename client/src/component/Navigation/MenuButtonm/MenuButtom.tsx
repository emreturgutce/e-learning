
import React, { MouseEvent } from "react";
import styled from "styled-components";
const MenuButtonContainer = styled.button`
  position: relative;
  align-items: center;
  border: none;
  color: "#1c1d1f";
cursor: pointer;
display: inline - flex;
min - width: 8rem;
padding: 0 1rem;
justify - content: center;
user - select: none;
-webkit - user - select: none;
vertical - align: bottom;
white - space: nowrap;
font - size: 1.4rem;
background - color: transparent;
min - width: auto;
font - family: var(--primary - font);
  &:hover {
  color: #5624d0;
}
`;

type Props = {

  children?: | React.ReactChild
  | React.ReactChild[];
  onMouseEnter?: MouseEvent,
  onMouseLeave?: MouseEvent,

};
const MenuButtom = ({
  children,
}: Props) => {


  return (
    <MenuButtonContainer>
      {children}
    </MenuButtonContainer>
  );
};

export default MenuButtom;
