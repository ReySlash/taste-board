import { CardImage } from "./recipe-card";
import MargaritaImG from "@/../public/4c91129ed03f9abaf17f0b54cd83206f2f3b709b.avif";

function CardsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      <div className="col-span-1">
        <CardImage
          title="Margarita"
          description="A classic margarita with tequila, triple sec, and lime juice."
          image={MargaritaImG.src}
        />
      </div>
      <div className="col-span-1">
        <CardImage
          title="Margarita"
          description="A classic margarita with tequila, triple sec, and lime juice."
          image={MargaritaImG.src}
        />
      </div>
      <div className="col-span-1">
        <CardImage
          title="Margarita"
          description="A classic margarita with tequila, triple sec, and lime juice."
          image={MargaritaImG.src}
        />
      </div>
      <div className="col-span-1">
        <CardImage
          title="Margarita"
          description="A classic margarita with tequila, triple sec, and lime juice."
          image={MargaritaImG.src}
        />
      </div>
      <div className="col-span-1">
        <CardImage
          title="Margarita"
          description="A classic margarita with tequila, triple sec, and lime juice."
          image={MargaritaImG.src}
        />
      </div>
      <div className="col-span-1">
        <CardImage
          title="Margarita"
          description="A classic margarita with tequila, triple sec, and lime juice."
          image={MargaritaImG.src}
        />
      </div>
    </div>
  );
}

export default CardsGrid;
