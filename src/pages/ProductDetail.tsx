import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import productsData from "@/data/products.json";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productsData.products.find((p) => p.id === Number(id));
  const [selectedAngle, setSelectedAngle] = useState(0);

  if (!product) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-foreground font-body">Product not found.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary font-body text-sm tracking-widest uppercase mb-12 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="grid md:grid-cols-2 gap-16">

          {/* Left: Image Gallery */}
          <div className="flex gap-4">

            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {product.angles.map((angle, index) => (
                <button
                  key={angle.label}
                  onClick={() => setSelectedAngle(index)}
                  className={`w-16 h-16 border overflow-hidden transition-all duration-300 ${
                    selectedAngle === index
                      ? "border-primary"
                      : "border-border opacity-50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={angle.image}
                    alt={angle.label}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <motion.div
              key={selectedAngle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -1000 && selectedAngle < product.angles.length - 1) {
                  setSelectedAngle(selectedAngle + 1);
                } else if (swipe > 1000 && selectedAngle > 0) {
                  setSelectedAngle(selectedAngle - 1);
                }
              }}
              className="flex-1 border border-border overflow-hidden cursor-grab active:cursor-grabbing"
            >
              <img
                src={product.angles[selectedAngle].image}
                alt={product.angles[selectedAngle].label}
                className="w-full h-full object-cover aspect-square pointer-events-none"
              />
            </motion.div>
          </div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-3">
              {product.type}
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
              {product.name}
            </h1>
            <p className="font-body text-2xl text-primary mb-8">
              {product.price}
            </p>

            {/* Angle Labels */}
            <div className="flex flex-wrap gap-2 mb-10">
              {product.angles.map((angle, index) => (
                <button
                  key={angle.label}
                  onClick={() => setSelectedAngle(index)}
                  className={`font-body text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-300 ${
                    selectedAngle === index
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {angle.label}
                </button>
              ))}
            </div>

            <a
              href="#order"
              onClick={() => navigate("/#order")}
              className="bg-gold-shimmer text-primary-foreground font-body text-sm tracking-widest uppercase px-10 py-4 text-center hover-gold-glow transition-all duration-500"
            >
              Book This Frame
            </a>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
