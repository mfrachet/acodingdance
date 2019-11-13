import styled from '@emotion/styled'

export const Wrapper = styled.div`
  width: 680px;
  margin: 0 auto;
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: center;
  flex-direction: column;

  @media only screen and (max-width: 768px) {
    width: auto;
    margin-left: 1rem;
    margin-right: 1rem;
  }
`
