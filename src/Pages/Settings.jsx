import { Button, Label, TextInput } from "flowbite-react";
import React from "react";

const Settings = () => {
  return (
    <div className="mx-auto my-20">
      <h1>this is settings page</h1>
      <div>
        <div>
          <form action="">
            <div className="flex">
              <div>
                <Label value="Store Name" />
                <TextInput type="text" id="storeName" />
              </div>
              <div className="ml-2">
                <Label value="Phone" />
                <TextInput type="text" id="storeName" />
              </div>
            </div>
          
            <div className="flex">
              <div>
                <Label value="Street" />
              <TextInput type="text" id="storeName" />
              </div>
              <div className="ml-2">
                  <Label value="City" />
              <TextInput type="text" id="storeName" />
              </div>
            </div>
            
            <div className="flex">
              <div >
                 <Label value="State" />
              <TextInput type="text" id="storeName" />
              </div>
              <div className="ml-2">
              <Label value="Portal Code" />
              <TextInput type="text" id="storeName" />
            </div>
            </div>
           
            <div className="flex">
              <div>
                <Label value="Country" />
              <TextInput type="text" id="storeName" />
              </div>
              <div className="m-6 ml-10">
              <Button>Change</Button>
              </div>
            </div>

          </form>
          <div className="flex">
            <div>
            <Button>
            Forget Password 
            </Button>
            </div>
            <div className="ml-2">
            <Button>
              Delete Account
            </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
