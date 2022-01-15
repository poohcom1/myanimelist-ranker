import styled from "styled-components";

const StyledImg = styled.img`
  margin: 0;
  width: 10vw;
  height: 10vw;
  object-fit: cover;
  transition: object-fit 0.25s;
`;

export default function SelectableImage({
  id,
  selectedId,
  anime,
  setSelected,
}) {
  return (
    <StyledImg
      onClick={() => setSelected(id)}
      src={anime.image_url}
      alt={anime.title}
      selected={id === selectedId}
    />
  );
}
