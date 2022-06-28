<template>
  <section class="hero is-small">
    <div class="hero-body">
      <p class="title">
        Murid
      </p>
      <p class="subtitle">
        Menampilkan NISN, Nama Siswa, edit dan delete. API endpoint https://uas2man.000webhostapp.com/pages/murid/
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
          <th>NO</th>
          <th>NISN</th>
          <th>Nama Siswa</th>
          <th>Alamat</th>
          <th>Jenis Kelamin</th>
          <th>Agama</th>
          <th>Jurusan</th>
          <th>Kelas</th>
          <th>Guru</th>
          <th>#</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="data.length" v-for="(value, index) in data">
          <td>{{index + 1}}</td>
          <td>{{value.nisn}}</td>
          <td>{{value.nama_murid}}</td>
          <td>{{value.alamat}}</td>
          <td>{{value.jenkel}}</td>
          <td>{{value.agama}}</td>
          <td>{{value.jurusan}}</td>
          <td>{{value.kelas}}</td>
          <td>{{value.guru.nama}}</td>
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
    <div class="modal" id="modal-delete">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Delete</p>
        </header>
        <section class="modal-card-body">
          <div v-if="selectedIndex > -1">
            <ul>
              <li>NISN <strong>{{data[selectedIndex].nisn}}</strong></li>
              <li>Nama Siswa <strong>{{data[selectedIndex].nama_murid}}</strong></li>
              <li>Kelas <strong>{{data[selectedIndex].kelas}}</strong></li>
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
                <label class="label" for="nama_murid_update">Nama Siswa</label>
                <div class="control">
                  <input class="input" type="text" id="nama_murid_update" placeholder="Nama Murid" required v-model="formEdit.nama_murid">
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
                <label class="label" for="jurusan_update">Jurusan</label>
                <div class="control">
                  <input class="input" type="text" id="jurusan_update" placeholder="Jurusan" required v-model="formEdit.jurusan">
                </div>
              </div>
              <div class="field">
                <label class="label" for="kelas_update">Kelas</label>
                <div class="control">
                  <input class="input" type="text" id="kelas_update" placeholder="Kelas" required v-model="formEdit.kelas">
                </div>
              </div>
              <div class="field">
                <label class="label" for="guru_update">Guru</label>
                <div class="control">
                  <div class="select is-primary">
                    <select name="guru_update" id="guru_update" v-model="formEdit.guru">
                      <option v-for="val in guru" :value="val.nip">{{val.nama_guru}}</option>
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
              <label class="label" for="nisn_insert">NISN</label>
              <div class="control">
                <input class="input" type="text" id="nisn_insert" placeholder="NISN" required v-model="formAdd.nisn">
              </div>
            </div>
            <div class="field">
              <label class="label" for="nama_murid_insert">Nama Siswa</label>
              <div class="control">
                <input class="input" type="text" id="nama_murid_insert" placeholder="Nama Siswa" required v-model="formAdd.nama_murid">
              </div>
            </div>
            <div class="field">
              <label class="label" for="alamat_insert">Alamat</label>
              <div class="control">
                <input class="input" type="text" id="alamat_insert" placeholder="Alamat" required v-model="formAdd.alamat">
              </div>
            </div>
            <div class="field">
              <label class="label" for="jenkel_insert">Jenis Kelamin</label>
              <div class="control">
                <input class="input" type="text" id="jenkel_insert" placeholder="Jenis Kelamin" required v-model="formAdd.jenkel">
              </div>
            </div>
            <div class="field">
              <label class="label" for="agama_insert">agama</label>
              <div class="control">
                <input class="input" type="text" id="agama_insert" placeholder="Agama" required v-model="formAdd.agama">
              </div>
            </div>
            <div class="field">
              <label class="label" for="jurusan_insert">Jurusan</label>
              <div class="control">
                <input class="input" type="text" id="jurusan_insert" placeholder="Jurusan" required v-model="formAdd.jurusan">
              </div>
            </div>
            <div class="field">
              <label class="label" for="kelas_insert">Kelas</label>
              <div class="control">
                <input class="input" type="text" id="kelas_insert" placeholder="kelas" required v-model="formAdd.kelas">
              </div>
            </div>
            <div class="field">
              <label class="label" for="guru_insert">Guru</label>
              <div class="control">
                <div class="select is-primary">
                  <select name="guru_insert" id="guru_insert" v-model="formAdd.guru">
                    <option value="0" disabled>---Guru---</option>
                    <option v-for="val in guru" :value="val.nip">{{val.nama_guru}}</option>
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
  </section>

</template>

<script>
import {nextTick} from "vue";
export default {
  name: "Murid",
  data(){
    return{
      data: [],
      guru: [],
      selectedIndex: -1,
      isLoading: false,
      formAdd: {
        nisn: '',
        nama_murid: '',
        alamat: '',
        jenkel: '',
        agama: '',
        jurusan: '',
        kelas: '',
        guru: ''
      },
      formEdit: {
        nisn: '',
        nama_murid: '',
        alamat: '',
        jenkel: '',
        agama: '',
        jurusan: '',
        kelas: '',
        guru: ''
      }
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      fetch(`https://uas2man.000webhostapp.com/pages/murid/index.php`,{
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
    loadGuru(){
      this.isLoading = true;
      const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      fetch(`https://uas2man.000webhostapp.com/pages/guru/index.php`,{
        method: 'GET',
      })
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(json => {
          this.guru = json.data;
        })
        .catch(()=>{
          alert('Terjadi error meload index guru')
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
          'nisn': selectedData.nisn
        });
        fetch(`https://uas2man.000webhostapp.com/pages/murid/delete.php`,{
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
            alert('Terjadi error saat delete')
          })
      }
      this.selectedIndex = -1;
    },
    update(){
      this.closeModal('modal-update');
      if(this.selectedIndex >= 0){
        const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
        const payload = new URLSearchParams({
          nama_murid: this.formEdit.nama_murid,
          alamat: this.formEdit.alamat,
          jenkel: this.formEdit.jenkel,
          agama: this.formEdit.agama,
          jurusan: this.formEdit.jurusan,
          kelas: this.formEdit.kelas,
          guru: this.formEdit.guru,
          nisn: this.formEdit.nisn,
        });
        fetch(`https://uas2man.000webhostapp.com/pages/murid/update.php`,{
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
            alert('Terjadi error update'+e.toString())
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
        nisn: selectedData.nisn,
        nama_murid: selectedData.nama_murid,
        alamat: selectedData.alamat,
        jenkel: selectedData.jenkel,
        agama: selectedData.agama,
        jurusan: selectedData.jurusan,
        kelas: selectedData.kelas,
        guru: selectedData.guru,
      }
      nextTick(()=>{
        document.getElementById('nama_murid_update').focus();
      })
    },
    showAdd(){
      this.resetFormAdd();
      this.showModal('modal-add');
      nextTick(()=>{
        document.getElementById('nisn_insert').focus();
      })
    },
    addNew(){
      this.closeModal('modal-add');
      const baseurl = import.meta.env.VITE_URL_ENDPOINT_2;
      const payload = new URLSearchParams({
        nama_murid: this.formAdd.nama_murid,
        alamat: this.formAdd.alamat,
        jenkel: this.formAdd.jenkel,
        agama: this.formAdd.agama,
        jurusan: this.formAdd.jurusan,
        kelas: this.formAdd.kelas,
        guru: this.formAdd.guru,
        nisn: this.formAdd.nisn,
      });
      fetch(`https://uas2man.000webhostapp.com/pages/murid/create.php`,{
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
          alert('Terjadi error saat create'+e.toString())
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
        nisn: '',
        nama_murid: '',
        alamat: '',
        jenkel: '',
        agama: '',
        jurusan: '',
        kelas: '',
        guru: ''
      }
    }
  },
  mounted() {
    this.load();
    this.loadGuru();
  }
}
</script>

<style scoped>
</style>