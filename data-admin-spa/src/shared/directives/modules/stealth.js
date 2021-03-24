export default {
    bind(el, binding, vnode) {
        el.style.display = binding.value ? 'block' : 'none'
    },
    inserted(el, binding, vnode) {
        console.log('inserted');
    },
    update(el, binding, vnode) {
        console.log('updated');
        el.style.display = binding.value ? 'block' : 'none'
    },
    componentUpdated(el, binding, vnode) {
        console.log('componentUpdated');
    },
    unbind(el, binding, vnode) {
        console.log('unbind');
    }
}