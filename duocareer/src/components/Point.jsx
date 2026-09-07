function Point({ number, status, onClick }) {
  return (
    <button 
        className='point ${status}'
        onClick={onClick}
        disabled={status === 'locked'}
    >
      {number}
    </button>
  )
}

export default Point