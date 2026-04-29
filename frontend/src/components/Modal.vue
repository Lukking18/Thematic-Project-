<template>
<transition name="modal-animation">
    <div v-show="modalActive" class ="modal">
        <transition name="modal-animation-inner">
            <div v-show="modalActive" class="modal-inner">
            <!--Modal Content-->
            <slot />

            <button @click="close" type="button" class="button">Close</button>
            </div>
        </transition>
    </div>
</transition>
</template>

<script>
export default{
props: ["modalActive"],
setup(props,{emit}){
    const close = () => {
        emit("close");
    };
    return { close };
},
};

</script>

<style>
.button{
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  padding: 0.6rem 1.4rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  transition: all 0.2s ease;
}

.modal{
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
width: 100vw;
position: fixed;
top: 0;
left: 0;
background-color: rgba(0,0,0,0.6);

}
.modal-inner {
    position: relative;
    max-width: 640px;
    width: 80%;
    box-sizing: border-box;
    background-color: #fff;
    padding: 64px 16px;
    border-radius: 16px;
}
</style>