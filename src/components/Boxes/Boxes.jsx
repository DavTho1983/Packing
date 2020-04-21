import React from 'react';
import Box from '../Box/Box';
import './boxes.css';
import _ from 'lodash';

export default function Boxes({containerInnerWidth, containerInnerHeight}) {
    console.log(containerInnerWidth, containerInnerHeight)
    const Packer = function(w, h) {
      this.root = { x: 0, y: 0, w: w, h: h };
    };
  
    
    Packer.prototype = {
    
    init: function(w, h) {
        this.root = { x: 0, y: 0, w: w, h: h };
    },
    
    fit: function(blocks) {
        console.log("FITTING!!!!!!!!!!!!!!!!!!!!!!!")
        var n, node, block;
        for (n = 0; n < blocks.length; n++) {
        block = blocks[n];
        if (node = this.findNode(this.root, block.w, block.h))
            block.fit = this.splitNode(node, block.w, block.h);
        }
        return blocks;
    },
    
    findNode: function(root, w, h) {
        console.log("FINDING!!!!!!!!!!!!!!!!!!!!")
        if (root.used)
        return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
        else if ((w <= root.w) && (h <= root.h))
        return root;
        else
        return null;
    },
    
    splitNode: function(node, w, h) {
        node.used = true;
        node.down  = { x: node.x,     y: node.y + h, w: node.w,     h: node.h - h };
        node.right = { x: node.x + w, y: node.y,     w: node.w - w, h: h          };
        return node;
    }

}
  
    const getColor = () => {
      let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      return randomColor;
    };
  
    const generateBoxes = () => {
        var blocks      = [];
        var blockBoxes = [];
        var blockCount  = 50;
        
        var binWidth   = containerInnerWidth;
        console.log("BINWIDTH", binWidth)
        var binHeight  = containerInnerHeight
        console.log("BINHEIGHT", binHeight)
      
        var maxHeight  = binHeight;
        var maxWidth   = binWidth;
        var min  = 20;
        
        // Make a bunch of random blocks.
        _.each(_.range(blockCount), function(i){
          var h = _.random(1,binHeight)
          h = h < min ? min : h;
          maxHeight -= h; 
          
          var w = _.random(1,binWidth);
          w = w < min ? min : w;
          maxWidth -= w;
              
          blocks.push( { w: w, h: h } )
        })

        console.log("BLOCKS!!!!!!!!!!!!!!!!", blocks)
        
        
        // Instantiate Packer
        var packer    = new Packer( binWidth, binHeight);
        
        // Sort inputs by area for best results.
        blocks = blocks.sort(function(a,b) { return (b.w*b.h < a.w*a.h ); }); 
        packer.fit(blocks);

        console.log("BLOCKS AFTER PACKER!!!!!!!!!!!!!!!!", blocks)
        
        // Draw the blocks
        _.each(blocks, function(o,i){
          var block = blocks[i];
        
          if (block.fit) {
            console.log("BLOCK FITS!!!!!!!!!!!!!!!!!!!!!!!!!!")
            var borderWidth = 2;
            var h = block.h - (borderWidth*4);
            var w = block.w - (borderWidth*4);

            blockBoxes.push(
                {   
                    top: block.fit.y,
                    left: block.fit.x,
                    borderWidth: borderWidth,
                    box: <Box width={w} height={h} backgroundColour={getColor()} boxText="AMMONITE"
                    />
                }
            )
          }
        
        })

        console.log("BLOCKBOXESS!!!!!!!!!!!!!!!!", blockBoxes)

        return blockBoxes;
      }

    return (
      <div className="Boxes">
        {generateBoxes().map((item, index) => {
          return (
            <div style={{position: 'absolute', top: item.top, left: item.left}}>
              {item.box}
            </div>
          );
        })}
      </div>
    );
  }
