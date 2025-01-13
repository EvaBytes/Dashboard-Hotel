export const ButtonStyled = styled("button")(({ theme }) => ({
  border: "2px solid transparent",
  backgroundColor: theme.palette.custom.light, 
  color: theme.palette.text.primary, 
  padding: ".5rem 1rem",
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.secondary.main, 
  },
}));
