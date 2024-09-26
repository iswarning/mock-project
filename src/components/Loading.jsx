import { Spinner } from "react-bootstrap"

function Loading() {

    const styleContainer = {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        opacity: '0.2',
        zIndex: 1000,
        display: 'grid',
        placeItems: 'center',
    }

  return (
    <div style={styleContainer}>
        <Spinner animation="grow" variant="warning" />
    </div>
  )
}

export default Loading