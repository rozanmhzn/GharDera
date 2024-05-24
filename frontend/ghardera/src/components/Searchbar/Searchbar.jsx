import { Button, TextInput, rem } from "@mantine/core";

function SearchBar() {
  return (
    <>
      <div className="flex justify-center items-center gap-2 p-2">
        <div className="w-[35vw]">
          <TextInput
            type="text"
            radius={10}
            size="md"
            placeholder="Enter location, city or neighbourhood"
            rightSection={
              <Button color="#235789" className="w-12">
                Search
              </Button>
            }
            style={{}}
            className="p-4"
            rightSectionWidth={rem(90)}
          />
        </div>
        
      </div>
    </>
  );
}

export default SearchBar;
