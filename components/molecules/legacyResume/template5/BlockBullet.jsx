import renderHTML from 'react-render-html';

const BlockBullet = (props) =>{
  let height = (props.fac * props.props.height).toString() + "px";
  let width = (props.fac * 183).toString() + "px";
  
  let name = props.props.name;
  let bg = props.bg;
  let font = props.font;
  let id = props.id;
  let line = (props.fac * props.props.height).toString() + "px";
  let size = (props.fac * 3.2).toString() + "pt";
  let left = (props.fac * 8).toString() + "px";
  let top = (props.fac * props.props.top).toString() + "px";
  let top1 = (props.fac * 3).toString() + "px";
  let height1 = (props.fac * 2).toString() + "px";
  let left1 = (props.fac * -5.5).toString() + "px";
  
  let lineT = (props.fac * 1.5).toString() + "px";
  let lineL = (props.fac * -2).toString() + "px";
  let size1 = (props.fac * 1).toString() + "pt";
  return (
    <div id = {id} style = {{height: `${height}`, width: `${width}`, position: `absolute`, top: `${top}`, left: `${left}`, color: `${font}`, fontFamily: `calibri`, fontSize: `${size}`, textAlign: `left`}}>
      
      <div style = {{lineHeight: `${size}`}}>
        {renderHTML(name)}
      </div>
      <div style = {{position: `absolute`, color: `${bg}`, fontSize:`${size1}`, top: `${lineT}`, left: `${lineL}`}}>
        <i class="fas fa-circle"></i>
      </div>
    </div>
  )
}

 export default BlockBullet;