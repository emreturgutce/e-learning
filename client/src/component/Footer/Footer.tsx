import React from 'react'
import styled from "styled-components";
import LanguageIcon from '@mui/icons-material/Language';


const FooterContainer = styled.div`
  font-weight: 200;
  line-height: 1.2;
  color: #1c1d1f;
`
const FooterSection = styled.section`
  margin:2.4rem 0 0 0;
  padding: 2.4rem 3.2rem 0 3.2rem;
  background-color: #1c1d1f;
  color: #fff;
  border-top: 1px solid #3e4143;
`
const FooterTop = styled.div`
  display: flex;
`
const LanguageSelectorContainer = styled.div`
  padding: 0;
  order: 1;
  flex-shrink: 1;
  margin-left: auto;
`
const LanguageSelectorBtn = styled.div`
  border: 1px solid #fff;
  color: #fff;
  justify-content: flex-start;
  padding: 0 1.6rem;
  min-width: 8rem;
  background-color: transparent;
  height: 4rem;
  position: relative;
  align-items: center;
  display: inline-flex;
  cursor: pointer;
  font-weight: 400;
  line-height: 1.4;
  font-size: 1.4rem;
`
const LanguageSpan = styled.span`
  margin-left: 0.8rem;
`
const FooterListUl = styled.ul`
  flex-basis: 13.6rem;
  margin: 0 1.6rem 0 0;
  padding: 0;
  list-style: none;
`
const FooterListLi = styled.li`
  padding-left: 0;
`
const FooterLink = styled.li`
  color: #fff;
  display: block;
  font-weight: 200;
  font-size: 0.8rem;
  text-decoration: none;
  padding: 0.4rem 0;

  &:hover {
  cursor: pointer;
  text-decoration: underline;
  }
`
const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6.4rem 0 3.2rem 0;
  color: #fff;
`
const LogoLink = styled.a`
  display: block;
  cursor: pointer;
  width: 91px;
  height: 34px;
`
const LogoImg = styled.img`
  width: 100%;
  height: auto;
`
const Copyright = styled.div`
  padding: 0;
  font-size: 1rem;
`

const Footer = () => {
  return (
    <FooterContainer>
      <FooterSection>
        <FooterTop>
          <FooterListUl>
            <FooterListLi><FooterLink >Business</FooterLink></FooterListLi>
            <FooterListLi><FooterLink >Teach on Udemy</FooterLink></FooterListLi>
            <FooterListLi><FooterLink >Get the app</FooterLink></FooterListLi>
            <FooterListLi><FooterLink >About us</FooterLink></FooterListLi>
            <FooterListLi><FooterLink >Contact us</FooterLink></FooterListLi>
          </FooterListUl>
          <FooterListUl>
            <FooterListLi><FooterLink >Careers</FooterLink></FooterListLi>
            <FooterListLi><FooterLink >Blog</FooterLink></FooterListLi>
            <FooterListLi><FooterLink >Help and Support</FooterLink></FooterListLi>
            <FooterListLi><FooterLink >Affiliate</FooterLink></FooterListLi>
            <FooterListLi><FooterLink >Investors</FooterLink></FooterListLi>
          </FooterListUl>
          <FooterListUl>
            <FooterListLi><FooterLink >Terms</FooterLink></FooterListLi>
            <FooterListLi><FooterLink >Privacy policy</FooterLink></FooterListLi>
            <FooterListLi><FooterLink >Cookie settings</FooterLink></FooterListLi>
            <FooterListLi><FooterLink >Sitemap</FooterLink></FooterListLi>
            <FooterListLi><FooterLink >Accessibility statement</FooterLink></FooterListLi>
          </FooterListUl>
        </FooterTop>
        <FooterBottom>
          <Copyright>&copy; 2022</Copyright>
        </FooterBottom>
      </FooterSection>
    </FooterContainer>
  )
}

export default Footer
