<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">
        Guru
      </p>
      <p class="subtitle">
        Menampilkan NIP, Nama Guru, edit dan delete. API endpoint https://uas2man.000webhostapp.com/pages/guru/
      </p>
    </div>
  </section>

  <section class="content">
    <div class="container">
      <button class="button is-link" @click="showAdd">
        <span class="icon is-small">
                    <i class="fas fa-plus"></i>
                  </span>
        <span>Data baru</span>
      </button>
      <table class="table">
        <thead>
        <tr>
          <th>#</th>
          <th>NIP</th>
          <th>Nama Guru</th>
          <th>No Hp</th>
          <th>Alamat</th>
          <th>Jenis Kelamin</th>
          <th>Agama</th>
          <th>Mata Pelajaran</th>
          <th>#</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="data.length" v-for="(value, index) in data">
          <td>{{index + 1}}</td>
          <td>{{value.nip}}</td>
          <td>{{value.nama_guru}}</td>
          <td>{{value.no_hp}}</td>
          <td>{{value.alamat}}</td>
          <td>{{value.jenkel}}</td>
          <td>{{value.agama}}</td>
          <td>{{value.mata_pelajaran.nama_matapelajaran}}</td>
          <td>
            <div class="field has-addons">
              <p class="control">
                <button class="button is-warning" @click="showUpdate(index)">
                  <span class="icon is-small">
                    <i class="fas fa-pencil"></i>
                  </span>
                  <span>Edit</span>
                </button>
              </p>
              <p class="control">
                <button class="button is-danger" @click="showDelete(index)">
                  <span class="icon is-small">
                    <i class="fas fa-trash"></i>
                  </span>
                  <span>Delete</span>
                </button>
              </p>
            </div>
          </td>
        </tr>
        <tr v-else>
          <td colspan="9">
            <div class="notification is-warning">
              Tidak ada data
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="has-text-centered" v-if="isLoading">
      <i class="fa-solid fa-spinner fa-pulse"></i>
    </div>
  </section>
  <div class="modal" id="modal-delete">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex > -1">
          <ul>
            <li>NIP <strong>{{data[selectedIndex].nip}}</strong></li>
            <li>Nama Guru <strong>{{data[selectedIndex].nama_guru}}</strong></li>
            <li>Mata Pelajaran <strong>{{data[selectedIndex].mata_pelajaran.nama_matapelajaran}}</strong></li>
          </ul>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="remove">Delete</button>
        <button class="button" @click="closeModal('modal-delete')">Close</button>
      </footer>
    </div>
  </div>
  <div class="modal" id="modal-update">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Update</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex > -1">
          <form @submit.prevent="update">
            <div class="field">
              <label class="label" for="nama_guru_update">Nama Guru</label>
              <div class="control">
                <input class="input" type="text" id="nama_guru_update" placeholder="nama_guru" required v-model="formEdit.nama_guru">
              </div>
            </div>
            <div class="field">
              <label class="label" for="no_hp_update">No Hp</label>
              <div class="control">
                <input class="input" type="text" id="no_hp_update" placeholder="no_hp" required v-model="formEdit.no_hp">
              </div>
            </div>
            <div class="field">
              <label class="label" for="alamat_update">Alamat</label>
              <div class="control">
                <input class="input" type="text" id="alamat_update" placeholder="Alamat" required v-model="formEdit.alamat">
              </div>
            </div>
            <div class="field">
              <label class="label" for="jenkel_update">Jenis Kelamin</label>
              <div class="control">
                <input class="input" type="text" id="jenkel_update" placeholder="Jenis Kelamin" required v-model="formEdit.jenkel">
              </div>
            </div>
            <div class="field">
              <label class="label" for="agama_update">Agama</label>
              <div class="control">
                <input class="input" type="text" id="agama_update" placeholder="Agama" required v-model="formEdit.agama">
              </div>
            </div>
            <div class="field">
              <label class="label" for="mata_pelajaran_update">Mata Pelajaran</label>
              <div class="control">
                <div class="select is-primary">
                  <select name="mata_pelajaran_update" id="mata_pelajaran_update" v-model="formEdit.mata_pelajaran">
                    <option v-for="val in mata_pelajaran" :value="val.kode_mata_pelajaran">{{val.nama_matapelajaran}}</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="update">Update</button>
        <button class="button" @click="closeModal('modal-update')">Close</button>
      </footer>
    </div>
  </div>
  <div class="modal" id="modal-add">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add new</p>
      </header>
      <section class="modal-card-body">
        <form @submit.prevent="addNew">
          <div class="field">
            <label class="label" for="nip_insert">NIP</label>
            <div class="control">
              <input class="input" type="text" id="nip_insert" placeholder="NIP" required v-model="formAdd.nip">
            </div>
          </div>
          <div class="field">
            <label class="label" for="nama_guru_insert">Nama Guru</label>
            <div class="control">
              <input class="input" type="text" id="nama_guru_insert" placeholder="Nama Guru" required v-model="formAdd.nama_guru">
            </div>
          </div>
          <div class="field">
            <label class="label" for="no_hp_insert">No Hp</label>
            <div class="control">
              <input class="input" type="text" id="no_hp_insert" placeholder="No Hp" required v-model="formAdd.no_hp">
            </div>
          </div>
          <div class="field">
            <label class="label" for="alamat_insert">Alamat</label>
            <div class="control">
              <input class="input" type="text" id="alamat_insert" placeholder="No Hp" required v-model="formAdd.alamat">
            </div>
          </div>
          <div class="field">
            <label class="label" for="jenkel_insert">Jenis Kelamin</label>
            <div class="control">
              <input class="input" type="text" id="jenkel_insert" placeholder="Jenis Kelamin" required v-model="formAdd.jenkel">
            </div>
          </div>
          <div class="field">
            <label class="label" for="agama_insert">Agama</label>
            <div class="control">
              <input class="input" type="text" id="agama_insert" placeholder="Agama" required v-model="formAdd.agama">
            </div>
          </div>
          <div class="field">
            <label class="label" for="mata_pelajaran_insert">Mata Pelajaran</label>
            <div class="control">
              <div class="select is-primary">
                <select name="mata_pelajaran_insert" id="mata_pelajaran_insert" v-model="formAdd.mata_pelajaran">
                  <option value="0" disabled>---Mata Pelajaran---</option>
                  <option v-for="val in mata_pelajaran" :value="val.kode_mata_pelajaran">{{val.nama_matapelajaran}}</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="addNew">Save</button>
        <button class="button" @click="closeModal('modal-add')">Close</button>
      </footer>
    </div>
  </div>
</template>

<script>
import {nextTick} from "vue";
export default {
  name: "Guru",
  data(){
    return{
      data: [],
      mata_pelajaran: [],
      selectedIndex: -1,
      isLoading: false,
      formAdd: {
        nip: '',
        nama_guru: '',
        no_hp: '',
        alamat: '',
        jenkel: '',
        agama: '',
        mata_pelajaran: ''
      },
      formEdit: {
        nip: '',
        nama_guru: '',
        no_hp: '',
        alamat: '',
        jenkel: '',
        agama: '',
        mata_pelajaran: ''
      }
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      //const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      fetch(`https://uas2man.000webhostapp.com/pages/guru/index.php`,{
        method: 'GET',
      })
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(json => {
          this.data = json.data;
        })
        .catch(()=>{
          alert('Terjadi error')
        })
        .finally(()=>{
          this.isLoading = false;
        })
    },
    loadMatapelajaran(){
      this.isLoading = true;
      const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      fetch(`https://uas2man.000webhostapp.com/pages/mata_pelajaran/index.php`,{
        method: 'GET',
      })
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(json => {
          this.mata_pelajaran = json.data;
        })
        .catch(()=>{
          alert('Terjadi error')
        })
        .finally(()=>{
          this.isLoading = false;
        })
    },
    remove(){
      this.closeModal('modal-delete');
      if(this.selectedIndex >= 0){
        const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
        const selectedData = this.data[this.selectedIndex];
        const payload = new URLSearchParams({
          'nip': selectedData.nip
        });
        fetch(`https://uas2man.000webhostapp.com/pages/guru/delete.php`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: payload.toString(),
        })
          .then(response => {
            if(response.ok){
              this.data.splice(this.selectedIndex, 1);
            }
            return response.json();
          })
          .then(json =>{
            if(!json.status){
              alert(json.error);
            }
          })
          .catch(()=>{
            alert('Terjadi error')
          })
      }
      this.selectedIndex = -1;
    },
    update(){
      this.closeModal('modal-update');
      if(this.selectedIndex >= 0){
        const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
        const payload = new URLSearchParams({
          nama_guru: this.formEdit.nama_guru,
          no_hp: this.formEdit.no_hp,
          alamat: this.formEdit.alamat,
          jenkel: this.formEdit.jenkel,
          agama: this.formEdit.agama,
          mata_pelajaran: this.formEdit.mata_pelajaran,
          nip: this.formEdit.nip,
        });
        fetch(`https://uas2man.000webhostapp.com/pages/guru/update.php`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: payload.toString(),
        })
          .then(response => {
            return response.json()
          })
          .then(json =>{
            if(!json.status){
              alert(json.error);
            }else{
              /*
              Update data pada kolom yg diupdate
               */
              this.data[this.selectedIndex] = json.data;
            }
          })
          .catch( (e) =>{
            alert('Terjadi error'+e.toString())
          })
          .finally(()=>{
            this.selectedIndex = -1;
          })
      }
    },
    showDelete(index){
      this.showModal('modal-delete');
      this.selectedIndex = index;
    },
    showUpdate(index){
      this.showModal('modal-update');
      this.selectedIndex = index;
      const selectedData = this.data[index];
      this.formEdit = {
        nip: selectedData.nip,
        nama_guru: selectedData.nama_guru,
        no_hp: selectedData.no_hp,
        alamat: selectedData.alamat,
        jenkel: selectedData.jenkel,
        agama: selectedData.agama,
        mata_pelajaran: selectedData.mata_pelajaran,
      }
      nextTick(()=>{
        document.getElementById('nama_guru_update').focus();
      })
    },
    showAdd(){
      this.resetFormAdd();
      this.showModal('modal-add');
      nextTick(()=>{
        document.getElementById('nip_insert').focus();
      })
    },
    addNew(){
      this.closeModal('modal-add');
      const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      const payload = new URLSearchParams({
        nama_guru: this.formAdd.nama_guru,
        no_hp: this.formAdd.no_hp,
        alamat: this.formAdd.alamat,
        jenkel: this.formAdd.jenkel,
        agama: this.formAdd.agama,
        mata_pelajaran: this.formAdd.mata_pelajaran,
        nip: this.formAdd.nip,
      });
      fetch(`https://uas2man.000webhostapp.com/pages/guru/create.php`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload.toString(),
      })
        .then(response => {
          return response.json()
        })
        .then(json =>{
          if(!json.status){
            alert(json.error);
          }else{
            this.data.push(json.data);
          }
        })
        .catch( (e) =>{
          alert('Terjadi error'+e.toString())
        })
        .finally(()=>{
          this.formAdd.nama = '';
        })
    },
    showModal(id){
      document.getElementById(id).classList.add('is-active');
    },
    closeModal(id){
      document.getElementById(id).classList.remove('is-active');
    },
    resetFormAdd(){
      this.formAdd = {
        nip: '',
        nama_guru: '',
        no_hp: '',
        alamat: '',
        jenkel: '',
        agama: '',
        mata_pelajaran: ''
      }
    }
  },
  mounted() {
    this.load();
    this.loadMatapelajaran();
  }
}
</script>

<style scoped>
</style>