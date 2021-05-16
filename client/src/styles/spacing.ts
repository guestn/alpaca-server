interface Spacing {
  [key:string]: number | { [key:string]: string }
}

const unit = 8;

const spacing: Spacing = {
  br: unit * 0.5,
  fullWidth: { width: '100%' },
  gridGap: unit * 3,
  sideBarW: unit * 14,
  unit,
};

export default spacing;
