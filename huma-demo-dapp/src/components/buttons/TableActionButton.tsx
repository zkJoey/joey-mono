import { Box, Button, css } from '@mui/material'

type Props = {
  title: string
  className?: string
  handleClick: () => void
  disabled?: boolean
}

export function TableActionButton({
  title,
  className,
  handleClick,
  disabled = false,
}: Props): React.ReactElement {
  const styles = css`
    border: none;
    padding: 0;
    background: ${disabled ? 'unset !important' : 'inherit'};
    &:hover {
      border: none;
    }
  `

  return (
    <Button
      className={className}
      variant={disabled ? undefined : 'outlined'}
      onClick={handleClick}
      css={styles}
      disabled={disabled}
    >
      <Box>{title}</Box>
    </Button>
  )
}
