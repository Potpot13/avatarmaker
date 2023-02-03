
import './App.css';
import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';
import { useEffect, useState } from 'react';
import { Button, Layout, Select, Radio } from 'antd';

const { Sider, Content} = Layout
function App() {

  const [avatar, setAvatar] = useState("");
  const [hairLength, setHairLength] = useState(true);
  const [hair, setHair] = useState(1);
  const [eyebrows, setEyebrows] = useState(1);
  const [eyes, setEyes] = useState(1);
  const [earrings, setEarrings] = useState(1)
  const [mouth, setMouth] = useState(1)
  const [glasses, setGlasses] = useState(0)
  const [hairColor, setHairColor] = useState("0e0e0e");
  const [skinColor, setSkinColor] = useState("f2d3b1");
  // const [character, setCharacter] = useState("Milo");
  const generateAvatar = async ()=>{
    const avatart = createAvatar(adventurer, {
      seed: `Milo`,
      skinColor: [`${skinColor}`],
      hair: [`${hairLength? "short": "long"}${hair < 10? "0"+hair : hair}`],
      eyebrows: [`variant${eyebrows < 10? "0"+eyebrows : eyebrows}`],
      eyes: [`variant${eyes < 10? "0"+eyes : eyes}`],
      earrings: [`variant02`],
      mouth: [`variant${mouth < 10? "0"+mouth : mouth}`],
      hairColor: [`${hairColor}`],
      glasses: [`variant0${glasses}`],
      glassesProbability: 100,
      hairProbability: 100
    })
  
    const svg = await avatart.toDataUri();
    setAvatar(svg)
    return avatart;
  }

  const saveAvatar = async ()=>{
    const avatar = await generateAvatar();
    const png = await avatar.png({})
    png.toFile("Avatar");
  }



  const hairColors = [
    {value: "0e0e0e" , label: "0e0e0e"},
    {value: "3eac2c" , label: "3eac2c"},
    {value: "6a4e35" , label: "6a4e35"},
    {value: "85c2c6" , label: "85c2c6"},
    {value: "796a45" , label: "796a45"},
    {value: "562306" , label: "562306"},
    {value: "592454" , label: "592454"},
    {value: "ab2a18" , label: "ab2a18"},
    {value: "ac6511" , label: "ac6511"},
    {value: "afafaf" , label: "afafaf"},
    {value: "b9a05f" , label: "b9a05f"},
    {value: "cb6820" , label: "cb6820"},
    {value: "dba3be" , label: "dba3be"},
    {value: "e5d7a3" , label: "e5d7a3"}
  ]
  

  const skinColors = [
    {value: "f2d3b1" , label: "f2d3b1"},
    {value: "9e5622" , label: "9e5622"},
    {value: "763900" , label: "763900"},
    {value: "ecad80" , label: "ecad80"}
  ]


  useEffect(()=>{
    generateAvatar();

  },[hair,eyebrows, eyes, earrings,mouth, hairColor, glasses, skinColor, hairLength])


  const handleClick = (state, operator)=>{
    state((value)=>  operator === "+"? value + 1 : value - 1)
  }
  
  return (
    <Layout className="App">
      <Sider width="300" style={{"backgroundColor": "white", "padding": "20px"}} className="sidebar shadow-lg">
            <div>
            <h3>Hair</h3>
            <Button onClick={()=> handleClick(setHair, "-")}>-</Button>
            <label>{hair}</label>
            <Button onClick={()=>handleClick(setHair, "+")}>+</Button>
            <Radio.Group value={hairLength} onChange={e=>setHairLength(e.target.value)}>
              <Radio value={true}>Short</Radio>
              <Radio value={false}>Long</Radio>
            </Radio.Group>
          </div>
          <div>
            <h3>Eyebrows</h3>
            <Button onClick={()=>handleClick(setEyebrows, "-")}>-</Button>
            <label>{eyebrows}</label>
            <Button onClick={()=>handleClick(setEyebrows, "+")}>+</Button>
          </div>
          <div>
            <h3>Eyes</h3>
            <Button onClick={()=>handleClick(setEyes, "-")}>-</Button>
            <label>{eyes}</label>
            <Button onClick={()=>handleClick(setEyes, "+")}>+</Button>
          </div>
          <div>
            <h3>Mouth</h3>
            <Button onClick={()=>handleClick(setMouth, "-")}>-</Button>
            <label>{mouth}</label>
            <Button onClick={()=>handleClick(setMouth, "+")}>+</Button>
          </div>
          <div>
            <h3>Hair Color</h3>
            <Select 
              style={{width: "120px"}}
              defaultValue={hairColor} 
              onChange={ value => { setHairColor(value)}}
              options={hairColors}
            />
          </div>
          <div>
            <h3>Glasses</h3>
            <Button onClick={()=>handleClick(setGlasses, "-")}>-</Button>
            <label>{glasses}</label>
            <Button onClick={()=>handleClick(setGlasses, "+")}>+</Button>
          </div>
          <div>
            <h3>Skin Color</h3>
            <Select 
              style={{width: "120px"}}
              defaultValue={skinColor}
              onChange={ value => { setSkinColor(value)}}
              options={skinColors}
            />
          </div>
          <div>
            <Button
              style={{"width": "200px", "height" : "50px"}}
             onClick={saveAvatar}
            >Save Avatar
            </Button>
          </div>
          {/* <div>
            <h3>Earrings</h3>
            <Button onClick={()=>setEarrings((val)=> val - 1)}>-</Button>
            <label>{earrings}</label>
            <Button onClick={()=>setEarrings(val=>val+1)}>+</Button>
          </div> */}
          
      </Sider>  
      <Content className='main-content'>
       <img  width="400px" height="400px" src={avatar}/>
      </Content>

    </Layout>
  );
}

export default App;
