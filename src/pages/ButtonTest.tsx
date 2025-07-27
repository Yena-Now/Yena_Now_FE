import Button from '@/components/Common/Button'

const VARIANTS = ['dark', 'lightGray', 'following', 'follow', 'yellow'] as const
const SIZES = ['sm', 'md', 'lg'] as const

const ButtonTest = () => {
  return (
    <div
      style={{
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}
    >
      {VARIANTS.map((variant) => (
        <div key={variant}>
          <h3 style={{ margin: 0 }}>{variant}</h3>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              marginTop: '8px',
            }}
          >
            {SIZES.map((size) => (
              <Button key={size} variant={variant} size={size}>
                {variant} {size}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ButtonTest
