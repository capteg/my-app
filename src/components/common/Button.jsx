const Button = ({ variant = 'primary', onClick, children, type = 'button', disabled }) => {
    const className = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={className}
      >
        {children}
      </button>
    );
  };
  
  export default Button;