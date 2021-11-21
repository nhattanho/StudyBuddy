import { Button } from "@material-ui/core";

export function PrimaryButton(props) {
  return <CustomButton color="#6157BB" textColor="white" {...props}/>
}

export function SecondaryButton(props) {
  return <CustomButton color="#FF494F" textColor="white" {...props}/>
}

export function TertiaryButton(props) {
  return <CustomButton color="#FFCB77" textColor="black" {...props}/>
}

export function DefaultButton(props) {
  return <CustomButton color="#E0E2DB" textColor="black" {...props}/>
}

const CustomButton = (props) => {
  return <Button
    className={props.className}
    style={{ backgroundColor: `${props.color}`, color: `${props.textColor}`}}
    variant="contained"
    onClick={props.onClick}
  >
    {props.text}
  </Button>
}
