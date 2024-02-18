export interface Weather {
  current:{
    condition: {
      icon: string;
      text: string;
    };
    temp_c:number;
  };
  location:{
    name: string,
  }
}
