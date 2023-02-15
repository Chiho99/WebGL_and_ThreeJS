window.addEventListener("DOMContentLoaded", init);
function init() {
    const width = 960;
    const height = 540;

    /**
     * レンダラー作成
     * WebGLのレンダリングをするためのレンダラーを作成
     */

    const renderer = new THREE.WebGLRenderer({
        // canvas要素の参照を渡す
        canvas: document.querySelector("#myCanvas")
    });

    // setSize()メソッドでサイズを設定
    renderer.setSize(width, height);
    // スマホサイズにも対応可能にするため、デバイスピクセル比も設定
    renderer.setPixelRatio(window.devicePixelRatio);

    /**
     * シーン作成
     * オブジェクトや光源などの置き場を作成
     */

    const scene = new THREE.Scene();

    /**
     * カメラ作成
     * Three.jsではカメラの視点から見えるものが、レンダラーを介してcanvas要素へ描画される
     */

    // new THREE.PerspectiveCamera(画角, アスペクト比, 描画開始距離, 描画終了距離)
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);

    // カメラの初期座標を設定(X座標:0, Y座標:0, Z座標:0)
    camera.position.set(0, 0, 1000);

    /**
     * 立方体作成
     * メッシュという表示オブジェクトを使用して作成
     * メッシュ作成には、ジオメトリ(形状)とマテリアル(素材)を用意する必要がある
     * マテリアルは色や質感の情報をもつ
     */

    // new THREE.BoxGeometry(幅, 高さ, 奥行き)
    const geometry = new THREE.BoxGeometry(300, 300, 300);

    const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });

    // 作成したmaterialとgeometryからメッシュ作成
    const box = new THREE.Mesh(geometry, material);

    // シーンに追加
    scene.add(box);

    /**
     * ライト作成
     */

    const light = new THREE.DirectionalLight(0xfffff);
    // 光の強さ
    light.intensity = 2;
    // ライトの方向
    light.position.set(1, 1, 1);
    // シーンに追加
    scene.add(light);

    renderer.render(scene, camera);

    /**
     * アニーメーション
     * renderer.render()を一度利用しただけでは、canvas要素に一度描写されただけなので
     * コマ送りにする必要がある
     */

    // 初回実行
    tick();

    function tick() {
        requestAnimationFrame(tick);

        // オブジェクトを回転させる
        box.rotation.x += 0.01;
        box.rotation.y += 0.01;

        // レンダリング
        renderer.render(scene, camera);
    }
}