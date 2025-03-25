import{R as L,r as l,j as e}from"./index-7zqVQZSl.js";import{m as I}from"./proxy-DuY12x7n.js";const F=t=>{let s;const a=new Set,n=(r,g)=>{const h=typeof r=="function"?r(s):r;if(!Object.is(h,s)){const f=s;s=g??(typeof h!="object"||h===null)?h:Object.assign({},s,h),a.forEach(i=>i(s,f))}},m=()=>s,x={setState:n,getState:m,getInitialState:()=>p,subscribe:r=>(a.add(r),()=>a.delete(r))},p=s=t(n,m,x);return x},Z=t=>t?F(t):F,z=t=>t;function H(t,s=z){const a=L.useSyncExternalStore(t.subscribe,()=>s(t.getState()),()=>s(t.getInitialState()));return L.useDebugValue(a),a}const B=t=>{const s=Z(t),a=n=>H(s,n);return Object.assign(a,s),a},V=t=>t?B(t):B,O=V(t=>({avialabeItems:[],setAvailableItems:s=>t(()=>({avialabeItems:s})),addAvailableItem:s=>t(a=>({avialabeItems:[...a.avialabeItems,s]})),removeAvailableItem:s=>t(a=>({avialabeItems:a.avialabeItems.filter(n=>n.id!==s)})),updateAvailableItem:s=>t(a=>({avialabeItems:a.avialabeItems.map(n=>n.id===s.id?s:n)}))})),X=()=>{const{setAvailableItems:t}=O(),[s,a]=l.useState([]),[n,m]=l.useState(!1),[w,P]=l.useState(!1),[x,p]=l.useState(null),[r,g]=l.useState(null),[h,f]=l.useState(100),[i,v]=l.useState(null),S=(c,u,j)=>{x?(a(s.map(b=>b.id===x.id?{...b,name:c,alignment:u,products:j}:b)),p(null)):a([...s,{id:Date.now().toString(),name:c,products:j,alignment:u}]),m(!1)},d=c=>{a(s.filter(u=>u.id!==c))},N=c=>{p(c),m(!0)},R=c=>{g(c)},k=c=>{if(r===null||r===c)return;const u=[...s],[j]=u.splice(r,1);u.splice(c,0,j),g(c),a(u)},D=()=>{g(null)},E=(c,u)=>{v({product:c,sourceRowId:u})},o=c=>{if(!i)return;const{product:u,sourceRowId:j}=i;if(j===c){v(null);return}a(b=>{const C=b.find(y=>y.id===j),U=b.find(y=>y.id===c);return C&&C.products.length===1||U&&U.products.some(y=>y.id===u.id)?b:b.map(y=>y.id===j?{...y,products:y.products.filter(Y=>Y.id!==u.id)}:y.id===c?{...y,products:[...y.products,u]}:y)}),v(null)},$=(c,u)=>{a(j=>j.map(b=>b.id===u?b.products.length===1?(alert("Cannot remove the last product from the row."),b):{...b,products:b.products.filter(C=>C.id!==c)}:b))},W=c=>{a(u=>u.map(j=>({...j,products:j.products.map(b=>b.id===c.id?c:b)})))};return l.useEffect(()=>{(async()=>{try{const j=await(await fetch("/api/items")).json();t(j)}catch(u){console.error("Error fetching products:",u)}})()},[t]),{rows:s,isRowModalOpen:n,isProductModalOpen:w,selectedRow:x,zoomLevel:h,addRow:S,removeRow:d,handleEditRow:N,handleDragStart:R,handleDragOver:k,handleDrop:D,handleProductDragStart:E,handleProductDrop:o,removeProduct:$,updateProductInRows:W,setIsRowModalOpen:m,setIsProductModalOpen:P,setZoomLevel:f}};function q({title:t,titleId:s,...a},n){return l.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":s},a),t?l.createElement("title",{id:s},t):null,l.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"}))}const M=l.forwardRef(q);function G({title:t,titleId:s,...a},n){return l.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":s},a),t?l.createElement("title",{id:s},t):null,l.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 12h14"}))}const J=l.forwardRef(G);function K({title:t,titleId:s,...a},n){return l.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":s},a),t?l.createElement("title",{id:s},t):null,l.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"}))}const T=l.forwardRef(K);function Q({title:t,titleId:s,...a},n){return l.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":s},a),t?l.createElement("title",{id:s},t):null,l.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4.5v15m7.5-7.5h-15"}))}const _=l.forwardRef(Q),ee=t=>{switch(t){case"left":return"justify-start";case"center":return"justify-center";case"right":return"justify-end";default:return""}},A=({onClick:t,icon:s,className:a,ariaLabel:n,title:m})=>e.jsx("button",{onClick:t,className:`p-1 ${a}`,"aria-label":n,title:m,children:s}),te=L.memo(({product:t,rowId:s,onProductDragStart:a,removeProduct:n})=>{const[m,w]=l.useState(!0);return e.jsxs("div",{className:"product-item flex flex-col items-center text-center p-2 sm:p-4",draggable:!0,onDragStart:()=>a(t,s),children:[e.jsxs("div",{className:"relative w-28 h-40 sm:w-36 sm:h-52 md:w-48 md:h-64 mb-2",children:[m&&e.jsx("div",{className:"absolute inset-0 flex items-center justify-center bg-gray-200 rounded-md",children:e.jsx("span",{className:"text-gray-500 text-sm",children:"Loading..."})}),e.jsx("img",{src:t.imageUrl,alt:t.name,className:`w-full h-full object-cover rounded-md cursor-grab ${m?"hidden":"block"}`,onLoad:()=>w(!1)}),e.jsx(A,{title:"Delete product from row",ariaLabel:"deleteProduct",onClick:()=>n(t.id,s),icon:e.jsx(M,{className:"h-5 w-5 text-red-500 hover:text-red-900"}),className:"absolute top-1 right-1 rounded-full shadow-md"})]}),e.jsx("h3",{className:"text-xs sm:text-sm md:text-base font-semibold",children:t.name}),e.jsxs("p",{className:"text-xs sm:text-sm md:text-base text-gray-600",children:["$",t.price.toFixed(2)]})]})}),se=({row:t,index:s,onDragStart:a,onDragOver:n,onDrop:m,removeRow:w,editRow:P,onProductDragStart:x,onProductDrop:p,removeProduct:r})=>{const g=i=>{const v=i.target;v.classList.contains("product-item")||v.closest(".product-item")||a(s)},h=()=>{window.confirm("Are you sure you want to delete this row?")&&w(t.id)},f=i=>{window.confirm("Are you sure you want to delete this product?")&&r(i,t.id)};return e.jsxs("div",{className:"product-row cursor-grab flex flex-col items-center p-4 border rounded-lg bg-white shadow-md text-black w-full sm:w-auto",draggable:!0,onDragStart:g,onDragOver:i=>{i.preventDefault(),n(s)},onDrop:()=>m(t.id),children:[e.jsxs("div",{className:"flex justify-between w-full mb-4",children:[e.jsxs("h3",{className:"text-lg font-bold",children:[t.name," - Template: ",t.alignment]}),e.jsxs("div",{className:"flex space-x-2",children:[e.jsx(A,{title:"Edit Row",ariaLabel:"edit",onClick:()=>P(t),icon:e.jsx(T,{className:"h-8 w-8 hover:text-blue-700"})}),e.jsx(A,{title:"Delete Row",ariaLabel:"deleteRow",onClick:()=>h(),icon:e.jsx(M,{className:"h-8 w-8 hover:text-red-700"})})]})]}),e.jsxs("div",{className:`products w-full flex space-x-8 overflow-clip ${ee(t.alignment)}`,onDragOver:i=>i.preventDefault(),onDrop:()=>{t.products.length<3&&p(t.id)},children:[t.products.map(i=>e.jsx(te,{product:i,rowId:t.id,onProductDragStart:x,removeProduct:v=>f(v)},i.id)),t.products.length===0&&e.jsx("p",{className:"text-gray-500 text-sm",children:"Drop items here"})]})]})},ae=({alignment:t,onAlignmentChange:s})=>{const a=n=>{s(n.target.value)};return e.jsxs("div",{className:"template-alignment",children:[e.jsx("label",{htmlFor:"alignment",className:"block mb-2 font-semibold",children:"Select Template Alignment:"}),e.jsxs("select",{id:"alignment",value:t,onChange:a,className:"w-full px-3 py-2 border rounded-lg bg-white",children:[e.jsx("option",{value:"left",children:"Left"}),e.jsx("option",{value:"center",children:"Center"}),e.jsx("option",{value:"right",children:"Right"})]}),e.jsxs("div",{className:`alignment-preview flex space-x-4 p-4 border rounded bg-gray-100 ${ne(t)}`,children:[e.jsx("div",{className:"placeholder w-12 h-12 bg-gray-300 rounded"}),e.jsx("div",{className:"placeholder w-12 h-12 bg-gray-300 rounded"}),e.jsx("div",{className:"placeholder w-12 h-12 bg-gray-300 rounded"})]})]})},ne=t=>{switch(t){case"left":return"justify-start";case"center":return"justify-center";case"right":return"justify-end";default:return""}},le=({isOpen:t,onClose:s,onCreate:a,row:n})=>{const{avialabeItems:m}=O(),[w,P]=l.useState((n==null?void 0:n.name)||""),[x,p]=l.useState((n==null?void 0:n.alignment)||"left"),[r,g]=l.useState((n==null?void 0:n.products)||[]),[h,f]=l.useState(null);l.useEffect(()=>{n?(P(n.name),p(n.alignment),g(n.products)):(P(""),p("left"),g([]),f(null))},[n,t]);const i=d=>{let N;r.some(R=>R.id===d.id)?N=r.filter(R=>R.id!==d.id):N=[...r,d],N.length<1?f("You must select at least one product."):N.length>3?f("You cannot select more than three products."):f(null),g(N)},v=()=>{if(r.length<1){f("You must select at least one product.");return}if(r.length>3){f("You cannot select more than three products.");return}a(w,x,r),s()},S=w.trim()===""||r.length<1||r.length>3;return e.jsxs("div",{className:`fixed inset-y-0 right-0 top-20 w-96 bg-white text-black shadow-lg transform transition-transform duration-300 ${t?"translate-x-0":"translate-x-full"}`,children:[e.jsxs("div",{className:"p-6",children:[e.jsx("h2",{className:"text-xl font-bold mb-4",children:n?"Edit Row":"Create New Row"}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"Name"}),e.jsx("input",{type:"text",value:w,onChange:d=>P(d.target.value),className:"w-full px-3 py-2 border rounded-lg bg-white",placeholder:"Enter row name"})]}),e.jsx("div",{className:"mb-4",children:e.jsx(ae,{alignment:x,onAlignmentChange:d=>p(d)})}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"Products"}),e.jsx("div",{className:"max-h-40 overflow-y-auto border rounded-lg p-2",children:m.map(d=>e.jsxs("div",{className:"flex items-center mb-2",children:[e.jsx("input",{type:"checkbox",checked:r.some(N=>N.id===d.id),onChange:()=>i(d),className:"mr-2 bg-white"}),e.jsx("span",{children:d.name})]},d.id))})]}),e.jsxs("div",{className:"flex justify-end space-x-2",children:[e.jsx("button",{onClick:s,className:"px-4 py-2 bg-gray-300 rounded hover:bg-gray-400",children:"Cancel"}),e.jsx("button",{onClick:v,disabled:S,className:`px-4 py-2 rounded text-white ${S?"bg-gray-400 cursor-not-allowed":"bg-blue-500 hover:bg-blue-600"}`,children:n?"Save Changes":"Create"})]})]}),h&&e.jsx("div",{className:"fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg",children:h})]})},re=({isOpen:t,onClose:s,onUpdateProduct:a})=>{const{avialabeItems:n,addAvailableItem:m,removeAvailableItem:w,updateAvailableItem:P}=O(),[x,p]=l.useState(""),[r,g]=l.useState(0),[h,f]=l.useState(""),[i,v]=l.useState(null),[S,d]=l.useState(null);l.useEffect(()=>{t||(p(""),g(0),f(""),v(null),d(null))},[t]);const N=o=>/^(https?:\/\/)[\w.-]+(\.[a-z]{2,})/i.test(o),R=()=>{if(!x.trim()||r<=0||!h.trim()){d("Please fill out all fields correctly.");return}if(!N(h)){d("Please enter a valid URL for the image.");return}if(i){const o={...i,name:x,price:r,imageUrl:h};P(o),a(o)}else{const o={id:Date.now().toString(),name:x,price:r,imageUrl:h};m(o)}s()},k=o=>{v(o),p(o.name),g(o.price),f(o.imageUrl)},D=o=>{window.confirm("Are you sure you want to delete this product?")&&w(o)},E=()=>{v(null),p(""),g(0),f("")};return e.jsxs("div",{className:`fixed inset-y-0 right-0 top-20 w-96 bg-white text-black shadow-lg transform transition-transform duration-300 ${t?"translate-x-0":"translate-x-full"}`,children:[e.jsxs("div",{className:"p-6",children:[e.jsx("h3",{className:"text-lg font-bold mb-2",children:"Product List"}),e.jsx("div",{className:"max-h-60 overflow-y-auto border rounded-lg p-2",children:n.map(o=>e.jsxs("div",{className:"flex justify-between items-center mb-2",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-medium",children:o.name}),e.jsxs("p",{className:"text-sm text-gray-600",children:["$",o.price.toFixed(2)]})]}),e.jsxs("div",{className:"flex space-x-2",children:[e.jsx("button",{onClick:()=>k(o),className:"hover:text-blue-800",title:"Edit Product",children:e.jsx(T,{className:"h-5 w-5"})}),e.jsx("button",{onClick:()=>D(o.id),className:"hover:text-red-800",title:"Delete Product",children:e.jsx(M,{className:"h-5 w-5"})})]})]},o.id))}),e.jsx("hr",{className:"my-4"}),e.jsxs("h2",{className:"text-xl font-bold mb-4 gap-2 flex items-center justify-between",children:[i?"Edit Product":"Add New Product",i&&e.jsx("button",{onClick:E,className:"text-sm text-blue-500  hover:text-blue-800 underline",children:"New Product"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"Name"}),e.jsx("input",{type:"text",value:x,onChange:o=>p(o.target.value),className:"w-full px-3 py-2 border rounded-lg bg-white",placeholder:"Enter product name"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"Price"}),e.jsx("input",{type:"number",value:r,onChange:o=>g(Number(o.target.value)),className:"w-full px-3 py-2 border rounded-lg bg-white",placeholder:"Enter product price"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-sm font-medium mb-1",children:"Image URL"}),e.jsx("input",{type:"text",value:h,onChange:o=>f(o.target.value),className:"w-full px-3 py-2 border rounded-lg bg-white",placeholder:"Enter image URL"})]}),e.jsxs("div",{className:"flex justify-end space-x-2",children:[e.jsx("button",{onClick:s,className:"px-4 py-2 bg-gray-300 rounded hover:bg-gray-400",children:"Cancel"}),e.jsx("button",{onClick:R,className:"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",children:i?"Save Changes":"Add Product"})]})]}),S&&e.jsx("div",{className:"fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg",children:S})]})},oe=({zoomLevel:t,setZoomLevel:s})=>e.jsxs("div",{className:"zoom-controls flex items-center space-x-4",children:[e.jsx("button",{onClick:()=>s(a=>Math.max(a-10,30)),disabled:t<=30,className:"p-2 rounded-full hover:bg-gray-300 disabled:bg-gray-300",children:e.jsx(J,{className:"h-6 w-6 text-gray-700"})}),e.jsxs("span",{className:"text-lg font-semibold",children:[t,"%"]}),e.jsx("button",{onClick:()=>s(a=>Math.min(a+10,200)),disabled:t>=200,className:"p-2 rounded-full hover:bg-gray-300 disabled:bg-gray-300",children:e.jsx(_,{className:"h-6 w-6 text-gray-700"})})]}),de=()=>[{title:"Category Manager"}],ue=()=>{const{rows:t,isRowModalOpen:s,isProductModalOpen:a,selectedRow:n,zoomLevel:m,addRow:w,removeRow:P,handleEditRow:x,handleDragStart:p,handleDragOver:r,handleDrop:g,handleProductDragStart:h,handleProductDrop:f,removeProduct:i,updateProductInRows:v,setIsRowModalOpen:S,setIsProductModalOpen:d,setZoomLevel:N}=X();return e.jsxs("div",{className:"flex flex-col items-center min-h-screen p-20 scroll-smooth",children:[e.jsxs("div",{className:"flex flex-row self-start space-x-4 mb-4 w-full justify-between",children:[e.jsxs("div",{className:"flex gap-10",children:[e.jsx(I.button,{onClick:()=>{S(!0),d(!1),x(null)},whileHover:{scale:1.1},className:"px-4 py-2 bg-transparent border rounded hover:bg-blue-500 hover:text-white w-[200px]",children:"Add Row"}),e.jsx(I.button,{onClick:()=>{S(!1),d(!0)},whileHover:{scale:1.1},className:"px-4 py-2 bg-transparent border rounded hover:bg-green-500 hover:text-white w-[200px]",children:"Manage Products"})]}),e.jsx(oe,{zoomLevel:m,setZoomLevel:N})]}),e.jsx("div",{className:"space-y-4 w-full max-w-4xl",style:{transform:`scale(${m/100})`,transformOrigin:"top"},children:t.length===0?e.jsxs("div",{className:"flex flex-col items-center justify-center text-center space-y-4",children:[e.jsx("p",{className:"text-gray-500 text-lg",children:"No rows have been created yet. Add one to visualize it."}),e.jsx(I.div,{onClick:()=>{S(!0),d(!1)},layoutId:"hero-button",className:"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer",whileHover:{scale:1.1},children:"Add Row"})]}):t.map((R,k)=>e.jsx(se,{row:R,index:k,onDragStart:p,onDragOver:r,onDrop:g,removeRow:P,editRow:x,onProductDragStart:h,onProductDrop:f,removeProduct:i},R.id))}),e.jsx(le,{isOpen:s,onClose:()=>S(!1),onCreate:w,row:n}),e.jsx(re,{isOpen:a,onClose:()=>d(!1),onUpdateProduct:v})]})};export{ue as default,de as meta};
